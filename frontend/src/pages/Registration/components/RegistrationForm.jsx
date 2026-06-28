import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/ui/InputField';
import SelectField from '../../../components/ui/SelectField';
import Button from '../../../components/ui/Button';

const RegistrationForm = ({ isSubmitting, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const semesterOptions = [1, 2, 3, 4, 5, 6, 7, 8].map(sem => ({ value: sem, label: `Semester ${sem}` }));
  const batchOptions = [
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'B3', label: 'B3' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.name}
          {...register('name', { required: 'Name is required' })}
        />
        <InputField
          label="Email"
          placeholder="Enter your email"
          error={errors.email}
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } })}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <InputField
          label="Phone Number"
          placeholder="Enter phone number"
          error={errors.phone}
          {...register('phone', { required: 'Phone is required', minLength: { value: 10, message: 'Valid phone is required' } })}
        />
      </div>

      <InputField
        label="Course"
        placeholder="e.g. BCA"
        error={errors.course}
        {...register('course', { required: 'Course is required' })}
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Semester"
          placeholder="Select Semester"
          options={semesterOptions}
          error={errors.semester}
          {...register('semester', { required: 'Semester is required' })}
        />
        <SelectField
          label="Batch"
          placeholder="Select Batch"
          options={batchOptions}
          error={errors.batch}
          {...register('batch', { required: 'Batch is required' })}
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          variant="gold"
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register & Proceed'}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
