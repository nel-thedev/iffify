import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "iffify" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    'iffify.helloWorld',
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage('Hello World from Iffify!');
    }
  );

  // const openView = vscode.commands.registerCommand('iffify.openView', () => {
  //   const columnToShowIn = vscode.window.activeTextEditor
  //     ? vscode.window.activeTextEditor.viewColumn
  //     : undefined;

  //   const panel = vscode.window.createWebviewPanel(
  //     'iffify',
  //     'Iffify',
  //     columnToShowIn || vscode.ViewColumn.One,
  //     {
  //       enableScripts: true,
  //       localResourceRoots: [
  //         vscode.Uri.joinPath(context.extensionUri, 'media'),
  //       ],
  //     }
  //   );

  //   panel.webview.html = `
  //     <!DOCTYPE html>
  //     <html lang="en">
  //     <head>
  //         <meta charset="UTF-8">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <title>Iffify</title>
  //     </head>
  //     <body>
  //         <h1>Hello World</h1>
  //     </body>
  //     </html>
  //   `;
  // });

  context.subscriptions.push(disposable);

  const provider = new CustomIffifyViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'iffify-view',
      // CustomIffifyViewProvider.viewType,
      provider
    )
  );
}

class CustomIffifyViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'iffify.openView';

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView): Thenable<void> | void {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this.getHtmlContent(
      webviewView.webview,
      'Hello World'
    );
  }

  private getHtmlContent(webview: vscode.Webview, i: string) {
    console.log('webview', webview);
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Iffify</title>
      </head>
      <body>
          <h1>${i}</h1>
      </body>
      </html>`;
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
