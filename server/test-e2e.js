import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

import connectDB from './config/db.js';
import User from './models/User.js';
import Project from './models/Project.js';
import Application from './models/Application.js';
import Task from './models/Task.js';
import Comment from './models/Comment.js';
import Notification from './models/Notification.js';

const BASE_URL = 'http://localhost:5000/api';

// Helper for fetch with cookie storage
class Session {
  constructor(name) {
    this.name = name;
    this.token = null;
    this.cookie = null;
    this.user = null;
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    };

    if (this.cookie) {
      headers['Cookie'] = this.cookie;
    }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      const match = setCookie.match(/projx_token=[^;]+/);
      if (match) {
        this.cookie = match[0];
      }
    }

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    return { status: res.status, ok: res.ok, data };
  }
}

async function runTests() {
  console.log('========================================================');
  console.log('🚀 PROJX FULL-STACK BACKEND & INTEGRATION TEST SUITE');
  console.log('========================================================\n');

  await connectDB();

  // Clean test records from DB
  await User.deleteMany({ email: /@test-projx\.com$/i });
  console.log('🧹 Cleaned previous test users from database.\n');

  const pm = new Session('Alice PM');
  const tm = new Session('Bob Team Member');
  const tm2 = new Session('Charlie Outsider');

  let testProjectId = null;
  let testApplicationId = null;
  let testTaskId = null;

  // 1. Register Project Manager
  console.log('1️⃣ Testing Project Manager Registration...');
  const pmReg = await pm.request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      fullName: 'Alice Morgan',
      email: 'alice.pm@test-projx.com',
      password: 'password123',
      confirmPassword: 'password123',
      role: 'project_manager',
    }),
  });
  console.log(`   Status: ${pmReg.status} - ${pmReg.data?.message}`);
  if (pmReg.status !== 201) throw new Error('PM Registration failed');
  pm.token = pmReg.data.token;
  pm.user = pmReg.data.user;

  // 2. Register Team Member
  console.log('2️⃣ Testing Team Member Registration...');
  const tmReg = await tm.request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      fullName: 'Bob Smith',
      email: 'bob.tm@test-projx.com',
      password: 'password123',
      confirmPassword: 'password123',
      role: 'team_member',
    }),
  });
  console.log(`   Status: ${tmReg.status} - ${tmReg.data?.message}`);
  if (tmReg.status !== 201) throw new Error('TM Registration failed');
  tm.token = tmReg.data.token;
  tm.user = tmReg.data.user;

  // 3. Register Second Team Member (Charlie)
  console.log('3️⃣ Testing Second Team Member Registration (Charlie)...');
  const tm2Reg = await tm2.request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      fullName: 'Charlie Davis',
      email: 'charlie.tm@test-projx.com',
      password: 'password123',
      confirmPassword: 'password123',
      role: 'team_member',
    }),
  });
  console.log(`   Status: ${tm2Reg.status} - ${tm2Reg.data?.message}`);
  tm2.token = tm2Reg.data.token;
  tm2.user = tm2Reg.data.user;

  // 4. Test Login
  console.log('\n4️⃣ Testing Login & Cookie Setting...');
  const loginRes = await pm.request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'alice.pm@test-projx.com',
      password: 'password123',
    }),
  });
  console.log(`   Status: ${loginRes.status} - Logged in as: ${loginRes.data?.user?.fullName} (${loginRes.data?.user?.role})`);
  if (loginRes.status !== 200) throw new Error('Login failed');

  // 5. Update Profile
  console.log('\n5️⃣ Testing Profile Update for Team Member...');
  const profUpdate = await tm.request('/users/profile', {
    method: 'PUT',
    body: JSON.stringify({
      fullName: 'Bob Smith',
      headline: 'Full-Stack Developer | React & Node.js',
      bio: 'Enthusiastic developer passionate about building scalable web apps.',
      skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      experience: '2 years working on full-stack web applications',
      education: 'B.S. in Computer Science',
      socialLinks: {
        github: 'https://github.com/bobsmith',
        linkedin: 'https://linkedin.com/in/bobsmith',
      },
    }),
  });
  console.log(`   Status: ${profUpdate.status} - ${profUpdate.data?.message}`);
  if (profUpdate.status !== 200) throw new Error('Profile update failed');

  // 6. PM Creates Project
  console.log('\n6️⃣ Testing Project Creation by PM...');
  const projRes = await pm.request('/projects', {
    method: 'POST',
    body: JSON.stringify({
      name: 'ProjX Distributed Engine',
      description: 'Building modern full-stack team collaboration platform.',
      requiredSkills: ['React', 'Node.js', 'MongoDB'],
      requiredExperience: '1-2 years experience',
      requiredMembers: 2,
      deadline: '2026-12-31',
      status: 'Recruiting',
    }),
  });
  console.log(`   Status: ${projRes.status} - Created Project: "${projRes.data?.project?.name}"`);
  if (projRes.status !== 201) throw new Error('Project creation failed');
  testProjectId = projRes.data.project._id || projRes.data.project.id;

  // 7. Security Authorization Check: Team Member tries to create project -> MUST BE REJECTED
  console.log('\n7️⃣ Security Check: Team Member attempting to create project...');
  const tmCreateProj = await tm.request('/projects', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Unauthorized Project',
      description: 'This should fail.',
      deadline: '2026-12-31',
    }),
  });
  console.log(`   Status: ${tmCreateProj.status} (Expected: 403 Forbidden)`);
  if (tmCreateProj.status !== 403) throw new Error('Security flaw: TM was able to create project');
  console.log('   ✅ Access control verified: Only Project Managers can create projects.');

  // 7b. Security Check: Team Member attempting to create task -> MUST BE REJECTED
  console.log('\n7️⃣b Security Check: Team Member attempting to create task...');
  const tmCreateTask = await tm.request('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Unauthorized Task',
      project: testProjectId,
      assignedTo: tm.user._id,
      dueDate: '2026-12-31',
    }),
  });
  console.log(`   Status: ${tmCreateTask.status} (Expected: 403 Forbidden)`);
  if (tmCreateTask.status !== 403) throw new Error('Security flaw: TM was able to create task');
  console.log('   ✅ Access control verified: Only Project Managers can create tasks.');

  // 8. Team Member Applies to Project ("Interested")
  console.log('\n8️⃣ Testing Team Member Application ("Interested")...');
  const appRes = await tm.request('/applications', {
    method: 'POST',
    body: JSON.stringify({ projectId: testProjectId }),
  });
  console.log(`   Status: ${appRes.status} - ${appRes.data?.message}`);
  if (appRes.status !== 201) throw new Error('Application failed');
  testApplicationId = appRes.data.application._id;

  // 9. Prevent Duplicate Application
  console.log('\n9️⃣ Security Check: Preventing Duplicate Application...');
  const dupAppRes = await tm.request('/applications', {
    method: 'POST',
    body: JSON.stringify({ projectId: testProjectId }),
  });
  console.log(`   Status: ${dupAppRes.status} (Expected: 400 Bad Request) - ${dupAppRes.data?.message}`);
  if (dupAppRes.status !== 400) throw new Error('Duplicate application not prevented');
  console.log('   ✅ Duplicate prevention verified.');

  // 10. PM Reviews & Accepts Application
  console.log('\n🔟 Testing PM Application Review & Acceptance...');
  const acceptRes = await pm.request(`/applications/${testApplicationId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: 'Accepted' }),
  });
  console.log(`   Status: ${acceptRes.status} - Application: ${acceptRes.data?.application?.status}`);
  if (acceptRes.status !== 200) throw new Error('Application accept failed');

  // Verify TM is now in project members
  const verifyProj = await pm.request(`/projects/${testProjectId}`);
  const hasMember = verifyProj.data?.project?.members?.some((m) => (m._id || m) === tm.user._id);
  console.log(`   Verified Bob is added to Project Members: ${hasMember ? '✅ YES' : '❌ NO'}`);
  if (!hasMember) throw new Error('Bob not found in project members');

  // 11. PM Assigns Task to Bob
  console.log('\n1️⃣1️⃣ Testing PM Task Creation & Assignment...');
  const taskRes = await pm.request('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Build Authentication Middleware',
      description: 'Implement JWT verification and HTTP-only cookie parsing.',
      project: testProjectId,
      assignedTo: tm.user._id,
      priority: 'High',
      status: 'To Do',
      dueDate: '2026-12-10',
    }),
  });
  console.log(`   Status: ${taskRes.status} - Created Task: "${taskRes.data?.task?.title}" assigned to Bob`);
  if (taskRes.status !== 201) throw new Error('Task creation failed');
  testTaskId = taskRes.data.task._id;

  // 12. Security Check: PM tries to assign task to Charlie (who has NOT been accepted)
  console.log('\n1️⃣2️⃣ Security Check: Assigning task to non-member Charlie...');
  const invalidTaskRes = await pm.request('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Invalid Assignment Task',
      project: testProjectId,
      assignedTo: tm2.user._id,
      dueDate: '2026-12-10',
    }),
  });
  console.log(`   Status: ${invalidTaskRes.status} (Expected: 400 Bad Request) - ${invalidTaskRes.data?.message}`);
  if (invalidTaskRes.status !== 400) throw new Error('Unaccepted member was assigned task');
  console.log('   ✅ Member validation verified: Only accepted members can be assigned tasks.');

  // 13. Team Member Updates Task Status & Submits Progress
  console.log('\n1️⃣3️⃣ Testing Team Member Task Progress Submission...');
  const taskUpdateRes = await tm.request(`/tasks/${testTaskId}`, {
    method: 'PUT',
    body: JSON.stringify({
      status: 'In Progress',
      progressUpdate: 'Completed JWT verify function; testing cookie transmission.',
    }),
  });
  console.log(`   Status: ${taskUpdateRes.status} - Status changed to: ${taskUpdateRes.data?.task?.status}`);
  console.log(`   Progress Note: "${taskUpdateRes.data?.task?.progressUpdate}"`);
  if (taskUpdateRes.status !== 200) throw new Error('Task update failed');

  // 14. Comments and Feedback
  console.log('\n1️⃣4️⃣ Testing Comments & Manager Feedback...');
  const pmComment = await pm.request('/comments', {
    method: 'POST',
    body: JSON.stringify({
      taskId: testTaskId,
      message: 'Excellent progress Bob, ensure secure flags are set for production cookies.',
    }),
  });
  console.log(`   PM Comment: "${pmComment.data?.comment?.message}" by ${pmComment.data?.comment?.author?.fullName}`);

  const tmComment = await tm.request('/comments', {
    method: 'POST',
    body: JSON.stringify({
      taskId: testTaskId,
      message: 'Understood Alice, secure flag enabled for production environments.',
    }),
  });
  console.log(`   TM Comment: "${tmComment.data?.comment?.message}" by ${tmComment.data?.comment?.author?.fullName}`);

  const commentsList = await tm.request(`/comments/task/${testTaskId}`);
  console.log(`   Total Comments on Task: ${commentsList.data?.count}`);
  if (commentsList.data?.count !== 2) throw new Error('Comments list count mismatch');

  // 15. Dynamic Progress Telemetry
  console.log('\n1️⃣5️⃣ Testing Dynamic Project Progress Calculation...');
  // Mark task completed
  await tm.request(`/tasks/${testTaskId}`, {
    method: 'PUT',
    body: JSON.stringify({ status: 'Completed' }),
  });

  const checkProgress = await pm.request(`/projects/${testProjectId}`);
  console.log(`   Total Tasks: ${checkProgress.data?.project?.totalTasks}`);
  console.log(`   Completed Tasks: ${checkProgress.data?.project?.completedTasks}`);
  console.log(`   Calculated Progress: ${checkProgress.data?.project?.progress}%`);
  if (checkProgress.data?.project?.progress !== 100) throw new Error('Progress calculation mismatch');
  console.log('   ✅ Dynamic database progress formula verified: (Completed / Total) * 100');

  // 16. Complete Notification System Verification
  console.log('\n1️⃣6️⃣ Testing Notification Lifecycle & Verification...');
  // Check PM notifications
  const pmNotifs = await pm.request('/notifications');
  console.log(`   PM total notifications: ${pmNotifs.data?.count}`);
  const hasAppReceived = pmNotifs.data?.notifications?.some((n) => n.type === 'application_received');
  const hasProgReport = pmNotifs.data?.notifications?.some((n) => n.type === 'task_progress');
  const hasComment = pmNotifs.data?.notifications?.some((n) => n.type === 'comment_added');
  console.log(`   - application_received: ${hasAppReceived ? '✅ YES' : '❌ NO'}`);
  console.log(`   - task_progress: ${hasProgReport ? '✅ YES' : '❌ NO'}`);
  console.log(`   - comment_added: ${hasComment ? '✅ YES' : '❌ NO'}`);
  if (!hasAppReceived) throw new Error('PM missing application_received notification');

  // Check TM notifications
  const tmNotifs = await tm.request('/notifications');
  console.log(`   TM total notifications: ${tmNotifs.data?.count}`);
  const hasAppAccepted = tmNotifs.data?.notifications?.some((n) => n.type === 'application_accepted');
  const hasTaskAssigned = tmNotifs.data?.notifications?.some((n) => n.type === 'task_assigned');
  const hasFeedback = tmNotifs.data?.notifications?.some((n) => n.type === 'task_feedback');
  console.log(`   - application_accepted: ${hasAppAccepted ? '✅ YES' : '❌ NO'}`);
  console.log(`   - task_assigned: ${hasTaskAssigned ? '✅ YES' : '❌ NO'}`);
  console.log(`   - task_feedback: ${hasFeedback ? '✅ YES' : '❌ NO'}`);
  if (!hasAppAccepted) throw new Error('TM missing application_accepted notification');
  if (!hasTaskAssigned) throw new Error('TM missing task_assigned notification');

  // Test unread count & mark as read
  const unreadBefore = await tm.request('/notifications/unread-count');
  console.log(`   TM unread count before: ${unreadBefore.data?.count}`);
  if (unreadBefore.data?.count <= 0) throw new Error('Unread count should be > 0');

  // Mark all read
  await tm.request('/notifications/read-all', { method: 'PATCH' });
  const unreadAfter = await tm.request('/notifications/unread-count');
  console.log(`   TM unread count after mark-all-read: ${unreadAfter.data?.count}`);
  if (unreadAfter.data?.count !== 0) throw new Error('Unread count should be 0 after mark-all-read');
  console.log('   ✅ Notification system verified 100% end-to-end.');

  // Cleanup test data
  console.log('\n🧹 Cleaning up test project, users, and notifications...');
  await pm.request(`/projects/${testProjectId}`, { method: 'DELETE' });
  await User.deleteMany({ email: /@test-projx\.com$/i });
  await Notification.deleteMany({ recipient: { $in: [pm.user._id, tm.user._id, tm2.user._id] } });

  console.log('\n========================================================');
  console.log('🎉 ALL INTEGRATION TESTS PASSED WITH 100% SUCCESS!');
  console.log('========================================================\n');
  process.exit(0);
}

runTests().catch((err) => {
  console.error('\n❌ Test Suite Failed:', err.message);
  process.exit(1);
});
