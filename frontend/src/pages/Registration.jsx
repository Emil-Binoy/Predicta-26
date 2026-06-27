import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Registration = () => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, trigger } = useForm();

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
            setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    const nextStep = async () => {
        const isStepValid = await trigger(['name', 'phone', 'course', 'semester', 'batch']);
        if (isStepValid) {
            setStep(2);
        }
    };

    const prevStep = () => setStep(1);

    const onSubmit = async (data) => {
        if (!file) {
            toast.error('Please upload your College ID');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('phone', data.phone);
        formData.append('course', data.course);
        formData.append('semester', data.semester);
        formData.append('batch', data.batch);
        formData.append('idCardImage', file);

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                toast.success('Registration successful! Verification complete.');
                // Redirect to prediction page with the predictionId
                navigate('/predict', { state: { predictionId: res.data.data.predictionId } });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-24 pb-12 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#50c878] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 w-full max-w-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Join the Championship</h2>
                    <p className="text-gray-300">Step {step} of 2</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-[#1c2541] h-2 rounded-full mt-4 overflow-hidden">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-[#d4af37] to-[#c5a028]"
                            initial={{ width: '50%' }}
                            animate={{ width: step === 1 ? '50%' : '100%' }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                    <input 
                                        {...register('name', { required: 'Name is required' })} 
                                        className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                                    <input 
                                        {...register('phone', { required: 'Phone is required', minLength: 10 })} 
                                        className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone && <p className="text-red-400 text-sm mt-1">Valid phone is required</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Course</label>
                                    <input 
                                        {...register('course', { required: 'Course is required' })} 
                                        className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                        placeholder="e.g. BCA"
                                    />
                                    {errors.course && <p className="text-red-400 text-sm mt-1">{errors.course.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Semester</label>
                                        <select 
                                            {...register('semester', { required: 'Semester is required' })} 
                                            className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                        >
                                            <option value="">Select Semester</option>
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                                <option key={sem} value={sem}>Semester {sem}</option>
                                            ))}
                                        </select>
                                        {errors.semester && <p className="text-red-400 text-sm mt-1">{errors.semester.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Batch</label>
                                        <select 
                                            {...register('batch', { required: 'Batch is required' })} 
                                            className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                        >
                                            <option value="">Select Batch</option>
                                            <option value="B1">B1</option>
                                            <option value="B2">B2</option>
                                            <option value="B3">B3</option>
                                        </select>
                                        {errors.batch && <p className="text-red-400 text-sm mt-1">{errors.batch.message}</p>}
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button 
                                        type="button" 
                                        onClick={nextStep}
                                        className="px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-black font-bold rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-lg font-medium text-white mb-2 text-center">Upload College ID for Verification</label>
                                    <p className="text-gray-400 text-sm text-center mb-4">Our system will automatically extract your Student ID.</p>
                                    
                                    <div 
                                        {...getRootProps()} 
                                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                                            ${isDragActive ? 'border-[#d4af37] bg-[rgba(212,175,55,0.1)]' : 'border-gray-500 hover:border-gray-400 bg-[#1c2541]'}
                                        `}
                                    >
                                        <input {...getInputProps()} />
                                        {previewUrl ? (
                                            <div className="flex flex-col items-center">
                                                <img src={previewUrl} alt="ID Preview" className="h-48 object-contain rounded-lg mb-4 shadow-lg" />
                                                <p className="text-sm text-[#d4af37] font-medium">Click or drag to replace image</p>
                                            </div>
                                        ) : (
                                            <div className="py-12">
                                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="text-gray-300">Drag & drop your ID card here, or click to select</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-between">
                                    <button 
                                        type="button" 
                                        onClick={prevStep}
                                        className="px-6 py-3 border border-gray-500 text-gray-300 font-bold rounded-lg hover:bg-gray-800 transition-all"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-black font-bold rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all disabled:opacity-50 flex items-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Verifying ID...
                                            </>
                                        ) : 'Register & Proceed'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>
        </div>
    );
};

export default Registration;
