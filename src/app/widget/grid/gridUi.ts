
export class GridUi {
    public module: string;
    public sizePage: number;
    public countReg: number;
    public withDetail: boolean = true;
    public currentPage: number;
    public pageTotal: number;
    public columns: ColumnUi[];
    public rows: RowUi[];
    public rowsData: RowUi[];
    public urlExport: string;
    public titleFile: string;
    public iconCount: string;
    public textoNoCount: string;
    public istextoNoCount: boolean;
}

export class ColumnUi {
    Id: string;
    Name: string;
    Cls: string;
    ind: number;
    isDesign: boolean;
    Type: Type;
    isOrder: boolean;
    isContraer: boolean = false;
    isOpenModal: boolean = false;
    isTextoVer: boolean = false;
    isValueEl: boolean = false;
    isHeaderType: boolean = false;
    isFormatJson: boolean = false;
    isVisible: string;
}

export class Type {
    name: string;
    disabled: boolean;
    useValue: boolean;
}

export class RowUi {
    i: number;
    key: any;
    rowData: DataUi[];
}

export class DataUi {
    data: string;
    Cls: string;
    ind: number;
    valueEl: object;
    valueCompare: object;
    valueChecked: boolean;
    visibleChecked: string;
    styleColor: string;
}

