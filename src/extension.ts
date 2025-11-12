import * as vscode from 'vscode';
import { createJourneyExperience } from './template/journey_exp';


async function ensureFolder(uri?: vscode.Uri) {
  if (!uri) throw new Error('No target folder (uri) provided');
  const stat = await vscode.workspace.fs.stat(uri);
  if (stat.type !== vscode.FileType.Directory) {
    throw new Error('Selected resource is not a folder');
  }
  return uri;
}
export function activate(context: vscode.ExtensionContext) {
  const map = [
    { id: 'journey.newExperience', title: 'New Journey Experience' },
    { id: 'journey.newPage', title: 'New Journey Page' },
    { id: 'journey.newModule', title: 'New Journey Module' },
    { id: 'journey.newStep', title: 'New Journey Step' },
    { id: 'journey.newBloc', title: 'New Journey Bloc' },
  ];

  for (const cmd of map) {
    const disposable = vscode.commands.registerCommand(cmd.id, async (uri?: vscode.Uri) => {
      try {
        const folder = await ensureFolder(uri);

        // ✅ เรียกใช้ฟังก์ชันที่เจาะจงสำหรับ Journey Experience
        if (cmd.id === 'journey.newExperience') {
          await createJourneyExperience(folder);
        } else {
          // 🔸 คำสั่งอื่น ๆ ยังแสดงข้อความเหมือนเดิม (implement ภายหลัง)
          vscode.window.showInformationMessage(`${cmd.title} @ ${folder.fsPath}`);
        }
      } catch (e: any) {
        vscode.window.showErrorMessage(`${cmd.title}: ${e.message ?? e}`);
      }
    });
    context.subscriptions.push(disposable);
  }
}

export function deactivate() { }