import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

import connectDB from './config/db.js';

async function cleanup() {
  try {
    const conn = await connectDB();
    const db = conn.connection.db;

    const targetProject = await db.collection('projects').findOne({ name: /AI.*Management/i });
    if (!targetProject) {
      console.error('CRITICAL: AI-Powered Task Management System project not found! Aborting deletion.');
      process.exit(1);
    }

    console.log(`PRESERVING Target Project: "${targetProject.name}" (ID: ${targetProject._id})`);

    // Find all projects that are NOT the target project
    const projectsToDelete = await db.collection('projects').find({
      _id: { $ne: targetProject._id }
    }).toArray();

    const deleteIds = projectsToDelete.map(p => p._id);
    console.log(`Found ${deleteIds.length} obsolete projects to remove.`);

    // 1. Delete tasks belonging to obsolete projects
    const taskResult = await db.collection('tasks').deleteMany({
      project: { $in: deleteIds }
    });
    console.log(`Deleted ${taskResult.deletedCount} obsolete tasks.`);

    // 2. Delete applications belonging to obsolete projects
    const appResult = await db.collection('applications').deleteMany({
      project: { $in: deleteIds }
    });
    console.log(`Deleted ${appResult.deletedCount} obsolete applications.`);

    // 3. Delete comments belonging to deleted tasks
    // (Tasks are already removed)

    // 4. Delete the obsolete projects themselves
    const projResult = await db.collection('projects').deleteMany({
      _id: { $in: deleteIds }
    });
    console.log(`Deleted ${projResult.deletedCount} obsolete projects.`);

    // 5. Verify remaining projects
    const remaining = await db.collection('projects').find().toArray();
    console.log('\n=== REMAINING ACTIVE PROJECTS ===');
    remaining.forEach(p => console.log(`- ${p.name} (ID: ${p._id}, Owner: ${p.owner})`));

    // Verify remaining users
    const usersCount = await db.collection('users').countDocuments();
    console.log(`Total user accounts preserved: ${usersCount}`);

    process.exit(0);
  } catch (err) {
    console.error('Cleanup error:', err);
    process.exit(1);
  }
}

cleanup();
