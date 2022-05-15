import { TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  name: string;
}

const TextArea = ({ label = '', className = '', ...props }: TextAreaProps) => {
  const [field, meta] = useField(props);
  const error = meta?.touched && meta?.error;

  return (
    <div className={classNames(className, 'flex flex-col space-y-1')}>
      {label ? (
        <label htmlFor="email" className="text-gray-600">
          {label}
        </label>
      ) : null}
      <div className="flex-1">
        <textarea
          {...field}
          {...props}
          className={classNames(
            'w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400'
              : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400'
          )}
        />
      </div>
    </div>
  );
};
export default TextArea;