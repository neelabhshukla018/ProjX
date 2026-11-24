import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import Input from '../common/Input';
import { Clock, Send, MessageSquare, Trash2, CheckCircle, Shield } from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';
import api, { API_ORIGIN } from '../../services/api';
import toast from 'react-hot-toast';

export const TaskDetailModal = ({ task, isOpen, onClose }) => {
  const { user, updateTaskStatus, deleteTask } = useWorkspace();
  const [taskData, setTaskData] = useState(task);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [progressNote, setProgressNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('To Do');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);

  const taskId = task?._id || task?.id;

  const fetchComments = async () => {
    if (!taskId) return;
    try {
      const res = await api.get(`/comments/task/${taskId}`);
      setComments(res.comments || []);
    } catch (err) {
      console.warn('Failed to fetch comments:', err.message);
    }
  };

  useEffect(() => {
    if (task && isOpen) {
      setTaskData(task);
      setSelectedStatus(task.status || 'To Do');
      setProgressNote(task.progressUpdate || '');
      fetchComments();
    }
  }, [task, isOpen]);

  if (!taskData) return null;

  const isAssignedToMe =
    taskData.assignedTo?._id?.toString() === user?._id?.toString() ||
    taskData.assignedTo?.toString() === user?._id?.toString();

  const isPM = user?.role === 'project_manager';

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const updated = await updateTaskStatus(taskId, selectedStatus, progressNote);
      setTaskData((prev) => ({ ...prev, status: selectedStatus, progressUpdate: progressNote }));
    } catch {
      // handled
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsPostingComment(true);
    try {
      const res = await api.post('/comments', {
        taskId,
        message: newComment.trim(),
      });
      setComments((prev) => [...prev, res.comment]);
      setNewComment('');
      toast.success('Comment added');
    } catch (err) {
      toast.error(err.message || 'Failed to post comment');
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleDeleteTask = async () => {
    if (window.confirm(`Delete task "${taskData.title}"?`)) {
      await deleteTask(taskId);
      onClose();
    }
  };

  const statuses = ['To Do', 'In Progress', 'In Review', 'Completed'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskData.title}
      subtitle={`Project: ${taskData.project?.name || 'General Task'}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5 max-h-[80vh] overflow-y-auto pr-1">
        {/* Info header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#F9F9F9] rounded-xl border border-[#EFEFEF] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#0F0F0F]">Assigned To:</span>
            <span className="text-[#5A5A5A] font-medium flex items-center gap-1.5">
              <Avatar
                src={taskData.assignedTo?.profilePhoto ? `${API_ORIGIN}${taskData.assignedTo.profilePhoto}` : ''}
                name={taskData.assignedTo?.fullName || 'Assignee'}
                size="xs"
              />
              {taskData.assignedTo?.fullName || 'Team Member'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#5A5A5A]">
              <span className="font-semibold text-[#0F0F0F]">Priority:</span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#D8D8D8] font-bold text-[#0F0F0F]">
                {taskData.priority || 'Medium'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#5A5A5A]">
              <Clock className="w-3.5 h-3.5" />
              <span>Due: {new Date(taskData.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider mb-1.5">
            Instructions & Criteria
          </h4>
          <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed whitespace-pre-line bg-white p-3 border border-[#E5E5E5] rounded-lg">
            {taskData.description || 'No specific instructions provided.'}
          </p>
        </div>

        {/* Project Manager Read-Only Status Telemetry Display */}
        {isPM && (
          <div className="p-4 border border-[#E5E5E5] rounded-xl bg-[#FAFAFA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider">
                Current Task Status
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  taskData.status === 'Completed'
                    ? 'bg-[#0F0F0F] text-white border-[#0F0F0F]'
                    : taskData.status === 'In Review'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : taskData.status === 'In Progress'
                    ? 'bg-[#2C2C2C] text-white border-[#2C2C2C]'
                    : 'bg-[#F0F0F0] text-[#0F0F0F] border-[#D8D8D8]'
                }`}
              >
                {taskData.status || 'To Do'}
              </span>
            </div>
            <p className="text-[11px] text-[#5A5A5A]">
              Task progression is managed exclusively by the assigned team member ({taskData.assignedTo?.fullName || 'Assignee'}).
            </p>
          </div>
        )}

        {/* Team Member Interactive Status & Progress Update Section */}
        {user?.role === 'team_member' && isAssignedToMe && (
          <div className="p-4 border border-[#E5E5E5] rounded-xl bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider">
                Update Task Status & Progress
              </h4>
              <span className="text-[11px] text-[#5A5A5A] font-medium">4 available status options</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                  Task Status (4 Options)
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-lg py-2 px-3 bg-[#F9F9F9] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F0F0F] mb-1">
                  Progress Note / Deliverable Link
                </label>
                <input
                  type="text"
                  placeholder="e.g. PR merged, completed unit tests..."
                  value={progressNote}
                  onChange={(e) => setProgressNote(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-lg py-2 px-3 bg-[#F9F9F9] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Button
                size="sm"
                variant="primary"
                isLoading={isUpdating}
                onClick={handleUpdate}
              >
                Save Status Update
              </Button>
            </div>
          </div>
        )}

        {/* Existing progress note display */}
        {taskData.progressUpdate && (
          <div className="p-3 bg-[#F5F5F5] rounded-lg border border-[#E5E5E5] text-xs">
            <span className="font-bold text-[#0F0F0F] block mb-0.5">Latest Progress Submission:</span>
            <span className="text-[#5A5A5A]">{taskData.progressUpdate}</span>
          </div>
        )}

        {/* Discussion / Comments Section */}
        <div className="pt-2 border-t border-[#EFEFEF]">
          <h4 className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" /> Comments & Manager Feedback ({comments.length})
          </h4>

          {/* Comments list */}
          <div className="space-y-3 mb-4 max-h-56 overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-xs text-[#888888] italic py-2">No comments or feedback yet. Start the conversation below.</p>
            ) : (
              comments.map((c) => {
                const author = c.author || {};
                const isAuthorPM = author.role === 'project_manager';

                return (
                  <div key={c._id} className="p-2.5 bg-[#F9F9F9] rounded-lg border border-[#EAEAEA] text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={author.profilePhoto ? `${API_ORIGIN}${author.profilePhoto}` : ''}
                          name={author.fullName || 'User'}
                          size="xs"
                        />
                        <span className="font-bold text-[#0F0F0F]">{author.fullName}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${isAuthorPM ? 'bg-black text-white' : 'bg-[#E5E5E5] text-[#2C2C2C]'}`}>
                          {isAuthorPM ? 'Manager' : 'Member'}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#888888]">
                        {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[#2C2C2C] text-xs pl-7 leading-relaxed">{c.message}</p>
                  </div>
                );
              })
            )}
          </div>

          {/* Add comment form */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Leave feedback or ask a question..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 text-xs sm:text-sm px-3 py-2 bg-white border border-[#D8D8D8] rounded-lg text-[#0F0F0F] outline-none focus:border-[#0F0F0F]"
            />
            <Button
              type="submit"
              size="sm"
              variant="primary"
              rightIcon={Send}
              isLoading={isPostingComment}
            >
              Post
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#EFEFEF] flex items-center justify-between">
          <div>
            {isPM && (
              <button
                type="button"
                onClick={handleDeleteTask}
                className="text-xs text-red-600 hover:text-red-800 font-semibold inline-flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Task
              </button>
            )}
          </div>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
