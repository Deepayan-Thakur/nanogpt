import { useState } from 'react';
import { api } from '../services/api';
import { Label, Input, Select } from '../components/ui/Form';
import { useNavigate } from 'react-router-dom';

export default function Train() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Default NanoGPT Hyperparameters
    const [config, setConfig] = useState({
        dataset: 'shakespeare',
        batch_size: 12,
        block_size: 64,
        max_iters: 1000,
        learning_rate: 3e-4,
        device: 'cpu', // Default to CPU for safety
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setConfig(prev => ({
            ...prev,
            [id]: id === 'dataset' || id === 'device' ? value : Number(value) // Parse numbers
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Attempt to reach the real backend
            await api.post('/train/start', config);
            navigate('/logs');
        } catch (error) {
            console.warn("Backend offline, switching to Demo Mode.");

            // SIMULATION: Fake a delay, then go to logs anyway
            setTimeout(() => {
                alert("Backend unreachable. Entering Demo/UI Mode.");
                navigate('/logs');
            }, 1000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Configure Training</h2>
                <p className="text-gray-400 mt-2">Set hyperparameters for the NanoGPT model run.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-8">

                {/* Section 1: Data & Device */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="dataset">Dataset</Label>
                        <Select
                            id="dataset"
                            value={config.dataset}
                            onChange={handleChange}
                            options={[
                                { value: 'shakespeare', label: 'Shakespeare (Tiny)' },
                                { value: 'openwebtext', label: 'OpenWebText (Large)' },
                            ]}
                        />
                    </div>
                    <div>
                        <Label htmlFor="device">Compute Device</Label>
                        <Select
                            id="device"
                            value={config.device}
                            onChange={handleChange}
                            options={[
                                { value: 'cpu', label: 'CPU (Slow)' },
                                { value: 'cuda', label: 'NVIDIA CUDA (Fast)' },
                                { value: 'mps', label: 'Apple MPS (Mac)' },
                            ]}
                        />
                    </div>
                </div>

                <div className="border-t border-gray-800"></div>

                {/* Section 2: Hyperparameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="batch_size">Batch Size</Label>
                        <Input
                            id="batch_size"
                            type="number"
                            value={config.batch_size}
                            onChange={handleChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">Number of sequences per step.</p>
                    </div>

                    <div>
                        <Label htmlFor="block_size">Block Size (Context)</Label>
                        <Input
                            id="block_size"
                            type="number"
                            value={config.block_size}
                            onChange={handleChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">Max tokens the model can see.</p>
                    </div>

                    <div>
                        <Label htmlFor="max_iters">Max Iterations</Label>
                        <Input
                            id="max_iters"
                            type="number"
                            value={config.max_iters}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="learning_rate">Learning Rate</Label>
                        <Input
                            id="learning_rate"
                            type="number"
                            step="0.0001"
                            value={config.learning_rate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`
              bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg 
              transition-all flex items-center gap-2
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
                    >
                        {loading ? 'Initializing...' : 'Start Training Run'}
                    </button>
                </div>
            </form>
        </div>
    );
}