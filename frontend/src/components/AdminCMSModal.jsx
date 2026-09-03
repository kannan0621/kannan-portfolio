import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Lock, Save, RefreshCw, CheckCircle, AlertCircle, LogOut, Inbox, User, Clock } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/portfolio';

export const AdminCMSModal = () => {
  const { 
    isCmsOpen, 
    setIsCmsOpen, 
    adminUser, 
    loginAdmin, 
    logoutAdmin, 
    data, 
    updatePortfolioData, 
    resetPortfolioData 
  } = usePortfolio();

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('hero');
  const [cmsData, setCmsData] = useState(() => ({ ...data }));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  // Database messages state
  const [dbMessages, setDbMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const fetchDatabaseMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`${API_BASE_URL}/messages`);
      const result = await res.json();
      if (result && result.data) {
        setDbMessages(result.data);
      }
    } catch (err) {
      console.error('Error fetching database messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'messages') {
      fetchDatabaseMessages();
    }
  }, [activeTab]);

  if (!isCmsOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const res = await loginAdmin(loginForm.username, loginForm.password);
    if (res.success) {
      setCmsData({ ...data });
      setMsg({ type: 'success', text: `Welcome back, ${res.user.username}!` });
    } else {
      setMsg({ type: 'error', text: res.message });
    }
  };

  const handleSaveCMS = async () => {
    setSaving(true);
    setMsg(null);
    const res = await updatePortfolioData(cmsData);
    setSaving(false);
    if (res.success) {
      setMsg({ type: 'success', text: 'Portfolio CMS content updated successfully!' });
    } else {
      setMsg({ type: 'error', text: 'Failed to update CMS.' });
    }
  };

  const handleResetCMS = async () => {
    if (window.confirm('Reset portfolio content to original R. KANNAN profile?')) {
      await resetPortfolioData();
      setCmsData({ ...data });
      setMsg({ type: 'success', text: 'Portfolio reset to default profile.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 dark:border-gray-800 relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Portfolio CMS Management Panel
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {adminUser ? `Logged in as: ${adminUser.username}` : 'Restricted Admin Access'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCmsOpen(false)}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Message */}
        {msg && (
          <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
            msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
          }`}>
            <div className="flex items-center gap-2">
              {msg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{msg.text}</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        {!adminUser ? (
          /* Login Form */
          <form onSubmit={handleLoginSubmit} className="space-y-4 py-8 max-w-sm mx-auto w-full">
            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-gray-900 dark:text-white">CMS Admin Authorization</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Enter Admin credentials to edit live portfolio content and view database messages</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Username</label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Credentials prompt removed for security */}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-500 text-white font-bold text-sm shadow-md hover:bg-teal-600 transition-colors"
            >
              Authenticate & Open CMS
            </button>
          </form>
        ) : (
          /* CMS Tabs & Editor */
          <div className="flex-1 overflow-hidden flex flex-col space-y-4">
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              {['hero', 'about', 'skills', 'experience', 'projects', 'messages'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    activeTab === tab 
                      ? 'bg-teal-500 text-white shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab === 'messages' && <Inbox className="w-3.5 h-3.5" />}
                  {tab === 'messages' ? `Messages DB (${dbMessages.length})` : tab}
                </button>
              ))}

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={logoutAdmin}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            </div>

            {/* Tab Editor Form */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 text-xs">
              
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-gray-700 dark:text-gray-300">Developer Name</label>
                      <input
                        type="text"
                        value={cmsData.hero?.name || ''}
                        onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, name: e.target.value } })}
                        className="w-full px-3 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 dark:text-gray-300">Professional Title</label>
                      <input
                        type="text"
                        value={cmsData.hero?.title || ''}
                        onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, title: e.target.value } })}
                        className="w-full px-3 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300">Subtitle Intro</label>
                    <textarea
                      rows={2}
                      value={cmsData.hero?.subTitle || ''}
                      onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, subTitle: e.target.value } })}
                      className="w-full px-3 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-gray-700 dark:text-gray-300">Phone</label>
                      <input
                        type="text"
                        value={cmsData.hero?.phone || ''}
                        onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, phone: e.target.value } })}
                        className="w-full px-3 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        value={cmsData.hero?.email || ''}
                        onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, email: e.target.value } })}
                        className="w-full px-3 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 dark:text-gray-300">Location</label>
                      <input
                        type="text"
                        value={cmsData.hero?.location || ''}
                        onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, location: e.target.value } })}
                        className="w-full px-3 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300">Professional Summary</label>
                    <textarea
                      rows={4}
                      value={cmsData.about?.summary || ''}
                      onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, summary: e.target.value } })}
                      className="w-full px-3 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-3">
                  <p className="text-gray-500 font-medium">Manage skills list & percentage progress levels:</p>
                  {(cmsData.skills || []).map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => {
                          const newSkills = [...cmsData.skills];
                          newSkills[sIdx].name = e.target.value;
                          setCmsData({ ...cmsData, skills: newSkills });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={skill.level}
                        onChange={(e) => {
                          const newSkills = [...cmsData.skills];
                          newSkills[sIdx].level = parseInt(e.target.value) || 0;
                          setCmsData({ ...cmsData, skills: newSkills });
                        }}
                        className="w-20 px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-center"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {(cmsData.projects || []).map((proj, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-2">
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const nextProjs = [...cmsData.projects];
                          nextProjs[pIdx].title = e.target.value;
                          setCmsData({ ...cmsData, projects: nextProjs });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 font-bold bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => {
                          const nextProjs = [...cmsData.projects];
                          nextProjs[pIdx].description = e.target.value;
                          setCmsData({ ...cmsData, projects: nextProjs });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* MESSAGES DATABASE TAB */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Inbox className="w-4 h-4 text-teal-500" />
                        <span>Database Contact Submissions</span>
                      </h4>
                      <p className="text-xs text-gray-500">Inquiries stored in MongoDB / Backend Memory</p>
                    </div>
                    <button
                      onClick={fetchDatabaseMessages}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-teal-600 dark:text-teal-400 text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Refresh DB
                    </button>
                  </div>

                  {loadingMessages ? (
                    <div className="py-8 text-center text-gray-500">Loading database messages...</div>
                  ) : dbMessages.length === 0 ? (
                    <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-500">
                      No contact messages stored in database yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dbMessages.map((m, idx) => (
                        <div key={m._id || m.id || idx} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
                          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                            <div className="flex items-center gap-2">
                              <User className="w-3.5 h-3.5 text-teal-500" />
                              <span className="font-bold text-gray-900 dark:text-white">{m.name}</span>
                              <span className="text-gray-500 font-mono">({m.email})</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-400">
                              <Clock className="w-3 h-3" />
                              <span>{m.createdAt ? new Date(m.createdAt).toLocaleString('en-IN') : 'Recent'}</span>
                            </div>
                          </div>
                          <div className="font-semibold text-gray-800 dark:text-gray-200">
                            Subject: {m.subject}
                          </div>
                          <div className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 leading-relaxed white-space-pre-wrap font-sans">
                            {m.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            {activeTab !== 'messages' && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <button
                  onClick={handleResetCMS}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Reset Default Data
                </button>

                <button
                  onClick={handleSaveCMS}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 text-white font-bold shadow-lg hover:bg-teal-600 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save CMS Changes'}
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
