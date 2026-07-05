import { useTranslation } from 'react-i18next';
import { Icon } from '@ui';
import { useContactForm } from '@hooks';

const FIELDS = [
  { id: 'your-name', labelKey: 'contact.name', type: 'text', required: true },
  { id: 'your-email', labelKey: 'contact.email', type: 'email', required: true },
  { id: 'your-subject', labelKey: 'contact.subject', type: 'text', required: false },
  { id: 'your-message', labelKey: 'contact.message', type: 'textarea', required: true },
];

function FormField({ id, label, type, required, value, error, invalid, className, onChange, onBlur }) {
  const errorId = `${id.replace('your-', '')}-error`;

  const fieldProps = {
    name: id,
    id,
    value,
    onChange,
    className,
    ...(required && {
      onBlur,
      required: true,
      'aria-required': 'true',
      'aria-invalid': invalid,
      'aria-describedby': error ? errorId : undefined,
    }),
  };

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>

      {type === 'textarea'
        ? <textarea {...fieldProps} rows="5" />
        : <input type={type} {...fieldProps} />}

      {error && (
        <div id={errorId} className="form-feedback form-feedback--error" role="alert">
          <Icon name="warning" size={20} className="form-feedback__icon" alt="alert feedback" />
          {error}
        </div>
      )}
    </div>
  );
}

export default function ContactForm({ buttonVariant = 'btn--white' }) {
  const { t } = useTranslation();
  const {
    formData,
    errors,
    touched,
    status,
    sending,
    handleChange,
    handleBlur,
    handleSubmit,
    inputClass,
  } = useContactForm();

  return (
    <form onSubmit={handleSubmit} aria-label={t('contact.formTitle')} noValidate>
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          name="website"
          id="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {FIELDS.map(({ id, labelKey, type, required }) => (
        <FormField
          key={id}
          id={id}
          label={t(labelKey)}
          type={type}
          required={required}
          value={formData[id]}
          error={required ? errors[id] : undefined}
          invalid={touched[id] && !!errors[id]}
          className={required ? inputClass(id) : 'form-input'}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ))}

      {/* Submit */}
      <button
        type="submit"
        className={`btn ${buttonVariant} form-group__btn`}
        disabled={sending}
        aria-busy={sending}
      >
        {sending ? t('form.sending') : t('contact.send')}
      </button>

      {/* Feedback de envío */}
      {status === 'success' && (
        <div className="form-feedback form-feedback--success" role="status">
          <Icon name="success" size={16} className="form-feedback__icon" alt="success feedback" overflow="visible" />
          {t('contact.success')}
        </div>
      )}
      {status === 'error' && (
        <span className="form-feedback form-feedback--error" role="alert">
          <Icon name="warning" size={20} className="form-feedback__icon" alt="alert feedback" />
          {t('contact.error')}
        </span>
      )}
    </form>
  );
}
