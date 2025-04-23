import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const server = http.createServer(app);

// Test
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// Socket.io Events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);




  // CREATE - Correct implementation
  socket.on('createTask', async (title: string) => { // Make sure title is string
    try {
      const newTask = await prisma.helloLord.create({
        data: {
          title: title, // Direct string value
          completed: false
        }
      });
      io.emit('taskCreated', newTask);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  });




  // READ
  socket.on('getTasks', async (callback) => {
    try {
      const tasks = await prisma.helloLord.findMany();
      if (!tasks) return callback([]);
      callback(tasks);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  });

  // UPDATE
  socket.on('updateTask', async ({ id, completed }) => {
    const updatedTask = await prisma.helloLord.update({
      where: { id },
      data: { completed }
    });
    io.emit('taskUpdated', updatedTask);
  });

  // DELETE
  socket.on('deleteTask', async (id: string) => {
    await prisma.helloLord.delete({ where: { id } });
    io.emit('taskDeleted', id);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });


  // This is my first try to make my own socket.io in here
  // This is fetch the request in the frontend
  socket.on('createSomething', async (title: string) => {
    try {
      const newTask = await prisma.helloLord.create({
        data: {
          title: title,
          completed: false
        }
      });

      io.emit('taskCreated', newTask)
    } catch (error) {
      console.error('Error creating task:', error)
    }
  })
});



const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});