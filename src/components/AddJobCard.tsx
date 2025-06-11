import React, { useState } from 'react';

interface AddJobCardProps {
  onClose: () => void;
  onSubmit: (jobData: any) => void;
}

const AddJobCard: React.FC<AddJobCardProps> = ({ onClose, onSubmit }) => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: [''],
    benefits: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(jobData);
    onClose();
  };

  const addRequirement = () => {
    setJobData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setJobData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const addBenefit = () => {
    setJobData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setJobData(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg">
      <div className="relative w-full max-w-2xl mx-4 bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-300"
        >
          <span className="text-white text-xl font-bold leading-none">×</span>
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Add New Job</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 mb-2">Job Title</label>
                <input
                  type="text"
                  required
                  value={jobData.title}
                  onChange={(e) => setJobData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Company</label>
                <input
                  type="text"
                  required
                  value={jobData.company}
                  onChange={(e) => setJobData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 mb-2">Location</label>
                <input
                  type="text"
                  required
                  value={jobData.location}
                  onChange={(e) => setJobData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="e.g. San Francisco, CA (Remote)"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Job Type</label>
                <select
                  value={jobData.type}
                  onChange={(e) => setJobData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Salary Range</label>
              <input
                type="text"
                value={jobData.salary}
                onChange={(e) => setJobData(prev => ({ ...prev, salary: e.target.value }))}
                className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="e.g. $120k - $180k"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2">Job Description</label>
              <textarea
                required
                rows={4}
                value={jobData.description}
                onChange={(e) => setJobData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Describe the role, responsibilities, and what makes this position exciting..."
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2">Requirements</label>
              {jobData.requirements.map((req, index) => (
                <input
                  key={index}
                  type="text"
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
                  placeholder={`Requirement ${index + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="text-purple-300 hover:text-purple-200 text-sm"
              >
                + Add Requirement
              </button>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Benefits</label>
              {jobData.benefits.map((benefit, index) => (
                <input
                  key={index}
                  type="text"
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
                  placeholder={`Benefit ${index + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={addBenefit}
                className="text-purple-300 hover:text-purple-200 text-sm"
              >
                + Add Benefit
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobCard;