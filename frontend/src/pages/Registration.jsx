import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';

const Registration = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedPredictionId = localStorage.getItem('predictionId');
        if (storedPredictionId) {
            navigate('/predict');
        }
    }, [navigate]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', data);

            if (res.data.success) {
                toast.success('Registration successful!');
                // Save to localStorage so they can't register again on this device
                localStorage.setItem('predictionId', res.data.data.predictionId);
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
                    <p className="text-gray-300">Enter your details to register</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <label className="block text-sm font-medium text-gray-300 mb-1">Student ID</label>
                            <input
                                {...register('studentId', { required: 'Student ID is required' })}
                                className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                placeholder="ID Written on your ID card"
                            />
                            {errors.studentId && <p className="text-red-400 text-sm mt-1">{errors.studentId.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input
                                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } })}
                                className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                            <input
                                {...register('phone', { required: 'Phone is required', minLength: { value: 10, message: 'Valid phone is required' } })}
                                className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                placeholder="Enter phone number"
                            />
                            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                        </div>
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
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-black font-bold rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all disabled:opacity-50 flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registering...
                                </>
                            ) : 'Register & Proceed'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Registration;
