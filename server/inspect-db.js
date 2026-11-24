import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import connectDB from './config/db.js';

async function inspect() {
  try {
    const conn = await connectDB();
    const db = conn.connection.db;

    const targetProj = await db.collection('projects').findOne({ name: /AI.*Management/i });
    console.log('\n=== TARGET PROJECT (AI Powered Management) ===');
    console.log(JSON.stringify(targetProj, null, 2));

    if (targetProj) {
      const owner = await db.collection('users').findOne({ _id: targetProj.owner });
      console.log('\n=== OWNER ===');
      console.log(JSON.stringify(owner, null, 2));

      const apps = await db.collection('applications').find({ project: targetProj._id }).toArray();
      console.log(`\n=== APPLICATIONS (${apps.length}) ===`);
      console.log(JSON.stringify(apps, null, 2));

      const tasks = await db.collection('tasks').find({ project: targetProj._id }).toArray();
      console.log(`\n=== TASKS (${tasks.length}) ===`);
      console.log(JSON.stringify(tasks, null, 2));
    }

    // List all projects and what would be deleted
    const allProjects = await db.collection('projects').find().toArray();
    console.log('\n=== PROJECT CANDIDATES FOR DELETION ===');
    for (const p of allProjects) {
      const isTarget = targetProj && p._id.toString() === targetProj._id.toString();
      const taskCount = await db.collection('tasks').countDocuments({ project: p._id });
      const appCount = await db.collection('applications').countDocuments({ project: p._id });
      console.log(`[${isTarget ? 'KEEP - TARGET' : 'DELETE - CANDIDATE'}] ID: ${p._id} | Name: "${p.name}" | Status: ${p.status} | Tasks: ${taskCount} | Apps: ${appCount}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Inspection error:', err);
    process.exit(1);
  }
}

inspect();
