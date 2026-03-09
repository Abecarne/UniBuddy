import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AdminForm, PickerField } from '../../src/components/AdminForm';
import { createContent } from '../../src/services/contentService';
import { useAuthStore } from '../../src/hooks/useAuth';
import { useLanguage } from '../../src/hooks/useLanguage';
import { CATEGORIES, AUDIENCES } from '../../src/constants/categories';
import { LANGUAGES } from '../../src/constants/languages';

const FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'summary', label: 'Summary', multiline: false },
  { key: 'body', label: 'Body', multiline: true, required: true },
];

export default function CreatePostScreen() {
  const router = useRouter();
  const t = useLanguage((s) => s.t);
  const session = useAuthStore((s) => s.session);
  const [values, setValues] = useState<Record<string, string>>({
    category: 'campus',
    audience: 'all',
    language_code: 'en',
    status: 'draft',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!values.title?.trim()) {
      Alert.alert('Validation', 'Title is required');
      return;
    }
    setLoading(true);
    try {
      await createContent({
        type: 'announcement',
        status: values.status as 'draft' | 'published',
        title: values.title,
        slug: values.title.toLowerCase().replace(/\s+/g, '-'),
        summary: values.summary || null,
        body: values.body || null,
        category: values.category || null,
        subcategory: null,
        audience: values.audience || null,
        campus_code: 'keimyung',
        language_code: values.language_code || 'en',
        translation_group_id: null,
        event_date: null,
        is_featured: false,
        created_by: session?.user?.id || null,
      });
      Alert.alert('Success', 'Announcement created', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminForm
      title={t('createAnnouncement')}
      fields={FIELDS}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel={t('create')}
      loading={loading}
    >
      <PickerField
        label={t('category')}
        options={CATEGORIES.map((c) => ({ key: c.key, label: c.label }))}
        value={values.category ?? ''}
        onChange={(v) => handleChange('category', v)}
      />
      <PickerField
        label={t('audience')}
        options={AUDIENCES.map((a) => ({ key: a.key, label: a.label }))}
        value={values.audience ?? ''}
        onChange={(v) => handleChange('audience', v)}
      />
      <PickerField
        label={t('language')}
        options={LANGUAGES.map((l) => ({ key: l.code, label: l.nativeLabel }))}
        value={values.language_code ?? ''}
        onChange={(v) => handleChange('language_code', v)}
      />
      <PickerField
        label={t('status')}
        options={[
          { key: 'draft', label: t('draft') },
          { key: 'published', label: t('published') },
        ]}
        value={values.status ?? 'draft'}
        onChange={(v) => handleChange('status', v)}
      />
    </AdminForm>
  );
}
