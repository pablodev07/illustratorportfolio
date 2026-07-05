import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CONTACT_ENDPOINT = 'https://cms.pablovester.com/wp-json/pablovester/v1/contact';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = {
  'your-name': '',
  'your-email': '',
  'your-subject': '',
  'your-message': '',
};

// Reglas de validación por campo: [predicado, claveDeError].
// El primer predicado que da true define el error mostrado.
const FIELD_RULES = {
  'your-name': [
    [(v) => !v.trim(), 'form.errors.required'],
    [(v) => v.trim().length < 2, 'form.errors.nameMin'],
  ],
  'your-email': [
    [(v) => !v.trim(), 'form.errors.required'],
    [(v) => !EMAIL_RE.test(v), 'form.errors.emailInvalid'],
  ],
  'your-message': [
    [(v) => !v.trim(), 'form.errors.required'],
    [(v) => v.trim().length < 10, 'form.errors.messageMin'],
  ],
};

export function useContactForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const validateField = (name, value) => {
    const rules = FIELD_RULES[name];
    if (!rules) return '';
    for (const [test, key] of rules) {
      if (test(value)) return t(key);
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};
    const allTouched = {};

    Object.keys(FIELD_RULES).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
      allTouched[key] = true;
    });

    setErrors(newErrors);
    setTouched(allTouched);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSending(true);
    setStatus(null);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData(EMPTY_FORM);
        setTouched({});
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  const inputClass = (name) => {
    if (!touched[name]) return 'form-input';
    return errors[name]
      ? 'form-input form-input--error'
      : 'form-input form-input--valid';
  };

  return {
    formData,
    errors,
    touched,
    status,
    sending,
    handleChange,
    handleBlur,
    handleSubmit,
    inputClass,
  };
}
