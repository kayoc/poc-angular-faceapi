import { AfterViewInit, Component, OnInit, NgZone } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from './modal-component/modal.component';
declare var AcessoWebFrame: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'pocangular';
  acessoWebFrame: any;

  constructor(private route: Router,
             private matDialog: MatDialog,
             private zone: NgZone) { }

  ngOnInit() {
    //this.showDialog("Loucura...");
  }

  ngAfterViewInit() {
      this.acessoWebFrame = new AcessoWebFrame();

      this.acessoWebFrame.onSuccessCaptureJS = this.onSuccessCapture.bind(this);
      this.acessoWebFrame.onFailedCaptureJS = this.onFailedCapture.bind(this);
      this.acessoWebFrame.onBrowserNotSupportJS = this.onBrowserNotSupport.bind(this);

      this.setTypeCamera(2);
  }

    showCompletedAnimation() {
        document.getElementById('box--completed')!.style.display = 'inline-block';
    };

    showLoadingModels() {
        document.getElementById('box--loading-models')!.style.display = 'inline-block';
    };

    hideLoadingModels() {
        document.getElementById('box--loading-models')!.style.display = 'none';
    };

    showError(message = "Ops... Algo inesperado aconteceu!") {
        document.getElementById('error-message')!.innerHTML = message;
        document.getElementById('box--error')!.style.display = 'inline-block';
    };

    onSuccessCapture(obj: any) {
        this.zone.run(() => {
            this.showDialog("Sucesso!");
            this.showCompletedAnimation();
        });
        console.log(obj);
    }

    onFailedCapture(err: string) {
        if (err === "navigator.MediaDevices.getUserMedia error: Permission denied, NotAllowedError") {
            this.showError('Você negou o acesso a câmera. Procure pelo icone de câmera na barra de navegação e mude sua decisão.')
        }

        console.log(err);
    }

    onBrowserNotSupport(obj: { listBrowsersSupport: string | any[]; }) {
        console.log(obj);
    };

    showDialog(msg: string): void {
        
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            titulo: 'Ops! Tente novamente',
            mensagem: msg
        };
        let dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            console.log('recarregar');
        });
    }

    setTypeCamera = (_type: number) => {

         /*para usar outros tipos de captura basta passar o número correto de acordo com o switch 
        1  - Camera Normal (Frontal)
        2  - Camera inteligente
        3  - Documentos (CNH)
        4  - Documentos (RG)
        5  - Documentos (CPF)
        6  - Documentos (NEW_RG)
        7  - Documentos (OTHERS)
        8  - Camera normal (Traseira)
        9  - Documentos (RG_FRONT)
        10 - Documentos (RG_BACK)
        11 - Documentos (NEW_RG_FRONT)
        12 - Documentos (NEW_RG_BACK)
        */

        switch (_type) {
            case 1:
                this.acessoWebFrame.initCameraNormal('#fff');
                break;
            case 2:
                this.showLoadingModels();
                this.acessoWebFrame.acessoWebFrameModel.loadModelsCameraInteligence()
                    .then(() => {
                        this.hideLoadingModels();
                        this.acessoWebFrame.initCameraInteligence('#2980ff', '#ed2121', '#fff');
                    })
                    .catch((e: string | undefined) => {
                        this.showError(e);
                        console.log(e);
                    });
                break;
            case 3:
                this.acessoWebFrame.initDocument(this.acessoWebFrame.TYPE_DOCUMENT.CNH, '#fff');
                break;
            case 4:
                this.acessoWebFrame.initDocument(this.acessoWebFrame.TYPE_DOCUMENT.RG, '#fff');
                break;
            case 5:
                this.acessoWebFrame.initDocument(this.acessoWebFrame.TYPE_DOCUMENT.CPF, '#fff');
                break;
            case 6:
                this.acessoWebFrame.initDocument(this.acessoWebFrame.TYPE_DOCUMENT.NEW_RG, '#fff');
                break;
            case 7:
                this.acessoWebFrame.initDocument(this.acessoWebFrame.TYPE_DOCUMENT.OTHERS, '#fff', 'Título de eleitor');
                break;
            case 8:
                this.acessoWebFrame.initCameraNormal('#fff', this.acessoWebFrame.FACE_MODE_TYPE.BACK);
                break;
            case 9:
                this.acessoWebFrame.initDocument(this.acessoWebFrame.TYPE_DOCUMENT.RG_FRONT, '#fff');
                break;
            case 10:
                this.acessoWebFrame.initDocument(this.acessoWebFrame.TYPE_DOCUMENT.RG_BACK, '#fff');
                break;
            case 11:
                this.acessoWebFrame.initDocument(this.acessoWebFrame.TYPE_DOCUMENT.NEW_RG_FRONT, '#fff');
                break;
            case 12:
                this.acessoWebFrame.initDocument(this.acessoWebFrame.TYPE_DOCUMENT.NEW_RG_BACK, '#fff');
                break;
            default:
                this.acessoWebFrame.initCameraNormal('#fff');
        }
    };
}
