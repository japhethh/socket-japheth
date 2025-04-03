"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Socket.io Events
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    // CREATE - Correct implementation
    socket.on('createTask', async (title) => {
        try {
            const newTask = await prisma.helloLord.create({
                data: {
                    title: title, // Direct string value
                    completed: false
                }
            });
            io.emit('taskCreated', newTask);
        }
        catch (error) {
            console.error('Error creating task:', error);
        }
    });
    // READ
    socket.on('getTasks', async (callback) => {
        try {
            const tasks = await prisma.helloLord.findMany();
            if (!tasks)
                return callback([]);
            callback(tasks);
        }
        catch (error) {
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
    socket.on('deleteTask', async (id) => {
        await prisma.helloLord.delete({ where: { id } });
        io.emit('taskDeleted', id);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
