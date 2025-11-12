"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const journey_exp_1 = require("./template/journey_exp");
async function ensureFolder(uri) {
    if (!uri)
        throw new Error('No target folder (uri) provided');
    const stat = await vscode.workspace.fs.stat(uri);
    if (stat.type !== vscode.FileType.Directory) {
        throw new Error('Selected resource is not a folder');
    }
    return uri;
}
function activate(context) {
    const map = [
        { id: 'journey.newExperience', title: 'New Journey Experience' },
        { id: 'journey.newPage', title: 'New Journey Page' },
        { id: 'journey.newModule', title: 'New Journey Module' },
        { id: 'journey.newStep', title: 'New Journey Step' },
        { id: 'journey.newBloc', title: 'New Journey Bloc' },
    ];
    for (const cmd of map) {
        const disposable = vscode.commands.registerCommand(cmd.id, async (uri) => {
            try {
                const folder = await ensureFolder(uri);
                // ✅ เรียกใช้ฟังก์ชันที่เจาะจงสำหรับ Journey Experience
                if (cmd.id === 'journey.newExperience') {
                    await (0, journey_exp_1.createJourneyExperience)(folder);
                }
                else {
                    // 🔸 คำสั่งอื่น ๆ ยังแสดงข้อความเหมือนเดิม (implement ภายหลัง)
                    vscode.window.showInformationMessage(`${cmd.title} @ ${folder.fsPath}`);
                }
            }
            catch (e) {
                vscode.window.showErrorMessage(`${cmd.title}: ${e.message ?? e}`);
            }
        });
        context.subscriptions.push(disposable);
    }
}
function deactivate() { }
