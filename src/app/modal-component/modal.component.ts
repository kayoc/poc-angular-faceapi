import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})

export class ModalComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData){ }

    ngOnInit(): void {

    }

    close() {
        this.dialogRef.close();
    }

    get buttonType(): ButtonType {
        return ButtonType.Default;
    }
}

enum ButtonType {
    Default,
    Accept
}

export interface DialogData {
    titulo: string;
    mensagem: string;
  }