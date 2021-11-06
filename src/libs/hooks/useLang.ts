import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreDispatch, useStoreSelector } from 'store';
import { app } from 'store/actions';
import { languageOption } from 'utils/constants';

export const useLang = () => {
  const { language } = useStoreSelector((state) => state.app);
  const dispatch = useStoreDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const handleChange = (value: keyof typeof languageOption) => {
    i18n.changeLanguage(value);
    dispatch(app.updateLanguage(value));
  };

  return {
    language,
    handleChange,
  };
};