const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

const filePath = "./data.json";
const historicoFilePath = "./history.json";

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

if (!fs.existsSync(historicoFilePath)) {
    fs.writeFileSync(historicoFilePath, JSON.stringify([]));
}

function readQueueFromFile() {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

function writeQueueToFile(queue) {
    fs.writeFileSync(filePath, JSON.stringify(queue, null, 2));
}

function readHistoricoFromFile() {
    const data = fs.readFileSync(historicoFilePath, "utf-8");
    return JSON.parse(data);
}

function writeHistoricoToFile(historico) {
    fs.writeFileSync(historicoFilePath, JSON.stringify(historico, null, 2));
}

app.get("/api/senhas", (req, res) => {
    const queue = readQueueFromFile();
    res.status(200).json(queue);
});

app.get("/api/senhas/atendidas", (req, res) => {
    const historico = readHistoricoFromFile();
    res.status(200).json(historico);
});

app.post("/api/senhas", (req, res) => {
    const { type } = req.body;
    const queue = readQueueFromFile();

    if (type === "preferencial") {
        queue.unshift({ id: Date.now(), type });
    } else {
        queue.push({ id: Date.now(), type });
    }

    writeQueueToFile(queue);

    res.status(200).json({ message: "Senha adicionada com sucesso!" });
});

app.put("/api/senhas/:id", (req, res) => {
    const senhaId = parseInt(req.params.id);
    const queue = readQueueFromFile();

    const senhaIndex = queue.findIndex((senha) => senha.id === senhaId);

    if (senhaIndex !== -1) {
        queue[senhaIndex].atendido = true;
        const historico = readHistoricoFromFile();
        historico.push(queue[senhaIndex]);
        writeHistoricoToFile(historico);
        writeQueueToFile(queue);
        res.status(200).json({ message: "Senha marcada como atendida!" });
    } else {
        res.status(404).json({ message: "Senha não encontrada!" });
    }
});

app.delete("/api/senhas/:id", (req, res) => {
    const senhaId = parseInt(req.params.id);
    let queue = readQueueFromFile();

    queue = queue.filter((senha) => senha.id !== senhaId);
    writeQueueToFile(queue);

    res.status(200).json({ message: "Senha removida com sucesso!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});