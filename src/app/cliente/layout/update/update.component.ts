import {Component, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import {ClienteService} from '../../cliente.service';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Location} from '@angular/common';
import {PaisConstante, TipoPersona} from '../../cliente.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounceTime';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import {AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {NavigationStart} from '@angular/router';
import * as moment from 'moment';
import {SharedService} from '../../../core/service/shared.service';
import {
  NgbDateStruct,
  NgbActiveModal,
  NgbDatepickerConfig, NgbDatepickerI18n
} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../../core/resources/ui/modal/modal.service';
import {MessageBoxType} from '../../../core/resources/ui/message-box/message-box.enum';
import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CustomDatepickerI18n, I18n} from '../../../core/directive/CustomDatepickerI18n';
import {ResponseModel} from '../../../core/resources/http/response.model';
import {CanComponentDeactivate} from '../../../core/util/guards/unsavedchanges/componentdeactivate.model';
import {RegexService} from '../../../core/util/regex/regex.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] // define custom NgbDatepickerI18n provider
})
export class UpdateComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy,     CanComponentDeactivate {
  loading = false;
  error: {
    state: boolean,
    codigo?: number,
    title?: string,
    message?: string
  } = {
    state: false,
    codigo: 500,
    title: 'ServerError',
    message: 'Ocurrió un error al intentar establecer conección con el servidor.'
   };
  clienteForm: FormGroup;
  nombreControl: FormControl;
  razonSocialControl: FormControl;
  apelPaternoControl: FormControl;
  apelMaternoControl: FormControl;
  numeroDocumentoControl: FormControl;
  telefonoControl: FormControl;
  celularControl: FormControl;
  correoControl: FormControl;
  estadoCivilControl: FormControl;
  generoControl: FormControl;
  fechaNacimientoControl?: FormControl;
  direccionControl: FormControl;
  codigoPostalControl: FormControl;
  paisControl: FormControl;
  departamentoControl: FormControl;
  provinciaControl: FormControl;
  distritoControl: FormControl;
  contactoNombreControl: FormControl;
  contactoNumeroDocControl: FormControl;
  contactoApelPaternoControl: FormControl;
  contactoApelMaternoControl: FormControl;
  sexoContactoControl: FormControl;
  contactoCelularControl: FormControl;
  contactoTelefonoControl: FormControl;
  contactoCorreoControl: FormControl;

  momentOject: {
    years: number;
    months: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  } = moment().toObject();
  public current_date: NgbDateStruct = {
    year: this.momentOject.years,
    month: this.momentOject.months,
    day: this.momentOject.date
  };
  public selectDefaultValue = '0000';
  public is_form_dirty = false;
  public is_ubigeo_empty = true;
  public is_validated = true;
  public submitted = false;
  public es_persona_juridica = false;
  public editMode = true;
  public isSaving = false;

  private routerParentParamsSubscription: Subscription;
  private modificarClienteServiceSubscription: Subscription;
  private obtenerClienteServiceSubscription: Subscription;

  generos: Observable<any[]>;
  estadoCiviles: Observable<any[]>;
  paises: Observable<any[]>;
  departamentos: Observable<any[]>;
  provincias: Observable<any[]>;
  distritos: Observable<any[]>;
  cliente: {
    idCliente: any;
    nombre: string;
    nombreCompleto: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    razonSocial: string;
    tipoPersona: string;
    tipoDocumento: string;
    tipoPersonaNombre: string;
    fechaNacimiento?: Date;
    correo: string;
    numeroDocumento: string;
    ruc: string;
    codigoGenero: string;
    genero: string;
    asesor: string;
    telefono: string;
    celular: string;
    codigoEstadoCivil: any;
    estadoCivil: string;
    idDireccion: any;
    direccion: string;
    distrito: string;
    codigoDistrito: any;
    provincia: string;
    codigoProvincia: any;
    departamento: string;
    codigoDepartamento: any;
    codigoPostal: string;
    idPais: any;
    pais: string;
    codigoPais: string;
    idContacto: any;
    contactoDocumento: string;
    tipoDocumentoContacto: string;
    nombreContacto: string;
    apellidoPaternoContacto: string;
    apellidoMaternoContacto: string;
    sexoContacto: string;
    telefonoContacto: string;
    celularContacto: string;
    correoContacto: string;
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clienteService: ClienteService,
              private location: Location,
              private sharedService: SharedService,
              private modalService: ModalService,
              private regexService: RegexService,
              config: NgbDatepickerConfig) {
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};
    config.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.routerParentParamsSubscription = this.route.parent.params.subscribe(
      params => {
        this.ObtenerCliente(params['id']);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routerParentParamsSubscription) {
      this.routerParentParamsSubscription.unsubscribe();
    }
    if (this.modificarClienteServiceSubscription) {
      this.modificarClienteServiceSubscription.unsubscribe();
    }
    if (this.obtenerClienteServiceSubscription) {
      this.obtenerClienteServiceSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    // console.log('after view init');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`ngOnChanges - data is ${this.clienteForm.value}`);
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        console.log(`${key} changed.
        Current: ${changes[key].currentValue}.
        Previous: ${changes[key].previousValue}`);
      }
    }
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    const _settings = {
      title: 'Advertencia',
      message:
        'Los cambios se perderán si sale de la pantalla. ¿ Está seguro de continuar ?',
      buttons: [
        {
          text: 'Aceptar',
          id: 'btn_aceptar',
          className: 'btn btn-success',
          iconClassName: 'fa-thumbs-up',
          click: $activeModal => {
            $activeModal.close(true);
          }
        },
        {
          text: 'Cancelar',
          id: 'btn_cancelar',
          className: 'btn btn-danger',
          iconClassName: 'fa-remove',
          click: $activeModal => {
            $activeModal.close(false);
          }
        }
      ],
      type: MessageBoxType.CONFIRMATION
    };
    return !this.submitted && (this.clienteForm && this.clienteForm.dirty)
      ? this.modalService.Open(_settings)
      : true;
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      const _settings = {
        title: 'Advertencia',
        message: '¿ Está seguro de efectuar los cambios ?',
        buttons: [
          {
            text: 'Aceptar',
            id: 'btn_aceptar',
            className: 'btn btn-success',
            iconClassName: 'fa-thumbs-up',
            click: $activeModal => {
              $activeModal.close(true);
            }
          },
          {
            text: 'Cancelar',
            id: 'btn_cancelar',
            className: 'btn btn-danger',
            iconClassName: 'fa-remove',
            click: $activeModal => {
              $activeModal.close(false);
            }
          }
        ],
        type: MessageBoxType.CONFIRMATION
      };
      this.modalService
        .Open(_settings)
        .then(confirmed => {
          if (confirmed) {
            this.GuardarCliente(this.clienteForm.value);
          }
        })
        .catch(err => {
          console.log(`Error ocurred trying confirm form: ${err}`);
        });
    }
  }

  private GuardarCliente(_clienteInfo: any) {
    let _cliente: {
      idCliente: any;
      numeroDocumentoOriginal: string;
      numeroDocumento: string;
      ruc: string;
      nombre: string;
      // nombreCompleto: string,
      apellidoPaterno: string;
      apellidoMaterno: string;
      razonSocial: string;
      tipoPersona: string;
      tipoDocumento: string;
      // tipoPersonaNombre: string,
      fechaNacimiento?: Date | NgbDateStruct;
      correo: string;
      // asesor: string,
      telefono: string;
      celular: string;
      codigoEstadoCivil: string;
      // estadoCivil: string,
      codigoGenero: string;
      genero: string;
      idDireccion: any;
      direccion: string;
      codigoDistrito: string;
      // distrito: string,
      codigoProvincia: string;
      // provincia: string,
      codigoDepartamento: string;
      // departamento: string,
      codigoPostal: string;
      idPais: any;
      codigoPais: string;
      // pais: string,
      // ventaVehiculo: boolean,
      // servicio: boolean,
      // ventaRepuesto: boolean,
      // fechaUltimoContacto: Date,
      // codigoUltimoContacto: string,
      idContacto: any;
      contactoDocumento: string;
      tipoDocumentoContacto: string;
      nombreContacto: string;
      apellidoPaternoContacto: string;
      apellidoMaternoContacto: string;
      sexoContacto: string;
      telefonoContacto: string;
      celularContacto: string;
      correoContacto: string;
    };
    _cliente = {
      idCliente: this.cliente.idCliente,
      numeroDocumento:
      _clienteInfo.numeroDocumento || this.cliente.numeroDocumento,
      numeroDocumentoOriginal: this.cliente.numeroDocumento,
      ruc: _clienteInfo.ruc || this.cliente.ruc,
      nombre: _clienteInfo.nombre || this.cliente.nombre,
      apellidoPaterno:
      _clienteInfo.apellidoPaterno || this.cliente.apellidoPaterno,
      apellidoMaterno:
      _clienteInfo.apellidoMaterno || this.cliente.apellidoMaterno,
      razonSocial: _clienteInfo.razonSocial || this.cliente.razonSocial,
      tipoPersona: this.cliente.tipoPersona,
      tipoDocumento: this.cliente.tipoDocumento,
      fechaNacimiento: _clienteInfo.fechaNacimiento
        ? this.fromDatetoNgbDateStructure(_clienteInfo.fechaNacimiento, true)
        : this.cliente.fechaNacimiento,
      correo: _clienteInfo.correo || this.cliente.correo,
      telefono: _clienteInfo.telefono || this.cliente.telefono,
      celular: _clienteInfo.celular || this.cliente.celular,
      codigoEstadoCivil:
      _clienteInfo.estadoCivil || this.cliente.codigoEstadoCivil,
      codigoGenero: _clienteInfo.codigoGenero || this.cliente.codigoGenero,
      genero: _clienteInfo.genero || this.cliente.genero,
      idDireccion: _clienteInfo.idDireccion || this.cliente.idDireccion,
      direccion: _clienteInfo.direccion || this.cliente.direccion,

      idPais: _clienteInfo.idPais || this.cliente.idPais,
      codigoPais: this.cliente.codigoPais,
      codigoDepartamento: _clienteInfo.departamento,
      codigoProvincia: _clienteInfo.provincia,
      codigoDistrito: _clienteInfo.distrito || this.cliente.codigoDistrito,
      codigoPostal: _clienteInfo.codigoPostal || this.cliente.codigoPostal,
      idContacto: this.cliente.idContacto,
      contactoDocumento:
      _clienteInfo.contacto.numeroDocumento || this.cliente.contactoDocumento,
      tipoDocumentoContacto: this.cliente.tipoDocumentoContacto,
      nombreContacto:
      _clienteInfo.contacto.nombre || this.cliente.nombreContacto,
      apellidoPaternoContacto: _clienteInfo.contacto.apellidoPaterno ||
      this.cliente.apellidoPaternoContacto,
      apellidoMaternoContacto: _clienteInfo.contacto.apellidoMaterno || this.cliente.apellidoMaternoContacto,
      sexoContacto: _clienteInfo.contacto.sexoContacto || this.cliente.sexoContacto,
      telefonoContacto: _clienteInfo.contacto.telefono || this.cliente.telefonoContacto,
      celularContacto: _clienteInfo.contacto.celular || this.cliente.celularContacto,
      correoContacto: _clienteInfo.contacto.correoContacto || this.cliente.correoContacto
    };
    this.isSaving = true;
    this.modificarClienteServiceSubscription = this.clienteService
      .Modificar(_cliente)
      .delay(1500)
      .subscribe((_response) => {
        this.submitted = true;
        console.log(_response);
        if (_response.code && _response.code === 500) {
          const _settings = {
            title: `Mensaje de Error (${_response.code})`,
            message: `Ocurrió un error al intentar guardar cambios: ${_response.message}`,
            buttons: [
              {
                text: 'Aceptar',
                id: 'btn_aceptar',
                className: 'btn btn-success',
                iconClassName: 'fa-thumbs-up',
                click: $activeModal => {
                  $activeModal.close(true);
                }
              }
            ],
            type: MessageBoxType.ERROR
          };
          this.modalService
            .Open(_settings)
            .then(confirmed => {
              console.log('modal close');
            })
            .catch(error => {
              console.log(`Error ocurred trying show form: ${error}`);
            });
        } else {
          this.sharedService.emitChange(_cliente);
          this.router.navigate(['../detail'], {relativeTo: this.route});
        }
      }, (err) => {
        this.isSaving = false;
        const _settings = {
          title: 'Mensaje de Error',
          message: 'Ocurrió un error al intentar guardar cambios',
          buttons: [
            {
              text: 'Aceptar',
              id: 'btn_aceptar',
              className: 'btn btn-success',
              iconClassName: 'fa-thumbs-up',
              click: $activeModal => {
                $activeModal.close(true);
              }
            }
          ],
          type: MessageBoxType.ERROR
        };
        this.modalService
          .Open(_settings)
          .then(confirmed => {
            console.log('modal close');
          })
          .catch(error => {
            console.log(`Error ocurred trying show form: ${error}`);
          });
      }, () => {
        this.isSaving = false;
      });
  }

  private ObtenerCliente(id: any) {
    this.loading = true;
    this.obtenerClienteServiceSubscription = this.clienteService
      .Obtener(id)
      .subscribe(
        (_cliente) => {
          this.cliente = {
            idCliente: _cliente.idCliente,
            nombre: _cliente.nombre,
            nombreCompleto: _cliente.nombreCompleto,
            numeroDocumento: _cliente.numeroDocumento,
            apellidoPaterno: _cliente.apellidoPaterno,
            apellidoMaterno: _cliente.apellidoMaterno,
            tipoPersona: _cliente.tipoPersona,
            tipoDocumento: _cliente.tipoDocumento,
            tipoPersonaNombre: _cliente.tipoPersonaNombre,
            razonSocial: _cliente.razonSocial,
            ruc: _cliente.ruc,
            telefono: _cliente.telefono,
            celular: _cliente.celular,
            correo: _cliente.correo,
            codigoEstadoCivil: _cliente.codigoEstadoCivil,
            estadoCivil: _cliente.estadoCivil,
            asesor: _cliente.asesor,
            codigoGenero: _cliente.codigoGenero,
            genero: _cliente.genero,
            fechaNacimiento: _cliente.fechaNacimiento
              ? moment(_cliente.fechaNacimiento, 'DD-MM-YYYY').toDate()
              : null,
            idDireccion: _cliente.idDireccion,
            direccion: _cliente.direccion,
            distrito: _cliente.distrito,
            codigoDistrito: _cliente.codigoDistrito,
            provincia: _cliente.provincia,
            codigoProvincia: _cliente.codigoProvincia,
            departamento: _cliente.departamento,
            codigoDepartamento: _cliente.codigoDepartamento,
            codigoPostal: _cliente.codigoPostal,
            idPais: _cliente.idPais,
            pais: _cliente.pais,
            codigoPais: _cliente.codigoPais,
            idContacto: _cliente.idContacto,
            contactoDocumento: _cliente.contactoDocumento,
            tipoDocumentoContacto: _cliente.tipoDocumentoContacto,
            nombreContacto: _cliente.nombreContacto,
            apellidoPaternoContacto: _cliente.apellidoPaternoContacto,
            apellidoMaternoContacto: _cliente.apellidoMaternoContacto,
            sexoContacto: _cliente.sexoContacto,
            telefonoContacto: _cliente.telefonoContacto,
            celularContacto: _cliente.celularContacto,
            correoContacto: _cliente.correoContacto
          };
          if (this.cliente.tipoPersona === TipoPersona.JURIDICA) {
            this.es_persona_juridica = true;
          }

          this.cliente.idPais = +this.cliente.idPais;
          this.paises = this.clienteService.obtenerPaises();
          if (this.cliente.idPais === PaisConstante.PERU) {
            this.departamentos = this.clienteService.obtenerDepartamentos();
            if (this.cliente.codigoDepartamento) {
              this.provincias = this.clienteService.obtenerProvincias(
                this.cliente.codigoDepartamento
              );
            } else {
              this.cliente.codigoDepartamento = this.selectDefaultValue;
            }
            if (this.cliente.codigoDepartamento && this.cliente.codigoProvincia) {
              this.distritos = this.clienteService.obtenerDistritos(
                this.cliente.codigoDepartamento,
                this.cliente.codigoProvincia
              );
            } else if (!this.cliente.codigoProvincia) {
              this.cliente.codigoProvincia = this.selectDefaultValue;
            }

            if (!this.cliente.distrito) {
              this.cliente.codigoDistrito = this.selectDefaultValue;
            }
          }
          this.generos = this.clienteService.obtenerGeneros();
          this.estadoCiviles = this.clienteService.obtenerEstadoCiviles();
          this.createFormControls(this.cliente);
          this.createForm();
        }, (err: any) => {
          this.loading = false;
          this.error.state = true;
          this.error.codigo = err.code;
          this.error.title = err.error;
          this.error.message = err.message;
        }, () => {
          this.loading = false;
        }
      );
  }

  private createFormControls(_cliente) {
    this.es_persona_juridica = (_cliente.tipoPersona === TipoPersona.JURIDICA) ? true : false;
    this.numeroDocumentoControl = new FormControl(_cliente.numeroDocumento, [
      Validators.required,
      Validators.maxLength(14)
    ]);

    if (this.cliente.tipoPersona === TipoPersona.NATURAL) {
      this.nombreControl = new FormControl(_cliente.nombre, [
        Validators.required,
        Validators.maxLength(80)
      ]);

      this.apelPaternoControl = new FormControl(_cliente.apellidoPaterno, [
        Validators.required,
        Validators.maxLength(60)
      ]);
      this.apelMaternoControl = new FormControl(_cliente.apellidoMaterno, [
        Validators.required,
        Validators.maxLength(60)
      ]);

      this.razonSocialControl = new FormControl(_cliente.razonSocial);

    } else {
      this.razonSocialControl = new FormControl(_cliente.razonSocial, [
        Validators.required,
        Validators.maxLength(80)
      ]);
      this.nombreControl = new FormControl(_cliente.nombre);
      this.apelPaternoControl = new FormControl(_cliente.apellidoPaterno);
      this.apelMaternoControl = new FormControl(_cliente.apellidoMaterno);
    }

    this.telefonoControl = new FormControl(_cliente.telefono, [Validators.maxLength(20)]);
    this.celularControl = new FormControl(_cliente.celular, [Validators.maxLength(20)]);


    if (this.cliente.tipoPersona === TipoPersona.NATURAL) {

      this.estadoCivilControl = new FormControl(_cliente.codigoEstadoCivil, [
        Validators.required,
        this.nonDefaultValueValidator([this.selectDefaultValue])
      ]);

      this.generoControl = new FormControl(_cliente.codigoGenero);

      this.fechaNacimientoControl = new FormControl(
        {
          value: _cliente.fechaNacimiento
            ? this.fromDatetoNgbDateStructure(_cliente.fechaNacimiento)
            : null,
          disabled: false
        },
        Validators.required
      );
    } else {
      this.estadoCivilControl = new FormControl(_cliente.codigoEstadoCivil);
      this.generoControl = new FormControl(_cliente.codigoGenero);
      this.fechaNacimientoControl = new FormControl(
        _cliente.fechaNacimiento
          ? this.fromDatetoNgbDateStructure(_cliente.fechaNacimiento)
          : null
      );
    }

    this.correoControl = new FormControl(_cliente.correo, [
      Validators.maxLength(260),
      Validators.pattern('^(([^<>()\\[\\]\\.,;:\\s@\\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@(([^<>()\\.,;\\s@\\\"]+\\.{0,1})+[^<>()\\.,;:\\s@\\\"]{2,})$')
    ]);

    this.paisControl = new FormControl(_cliente.idPais, [
      Validators.required,
      this.nonDefaultValueValidator([this.selectDefaultValue])
    ]);

    _cliente.idPais = +_cliente.idPais;
    if (_cliente.idPais === PaisConstante.PERU) {

      this.departamentoControl = new FormControl(_cliente.codigoDepartamento || this.selectDefaultValue, [
        Validators.required,
        this.nonDefaultValueValidator([this.selectDefaultValue])
      ]);

      this.provinciaControl = new FormControl(_cliente.codigoProvincia || this.selectDefaultValue, [
        Validators.required,
        this.nonDefaultValueValidator([this.selectDefaultValue])
      ]);

      this.distritoControl = new FormControl(_cliente.codigoDistrito || this.selectDefaultValue, [
        Validators.required,
        this.nonDefaultValueValidator([this.selectDefaultValue])
      ]);
    } else {
      this.departamentoControl = new FormControl({
        value: _cliente.codigoDepartamento,
        disabled: true
      });
      this.provinciaControl = new FormControl({
        value: _cliente.codigoProvincia,
        disabled: true
      });
      this.distritoControl = new FormControl({
        value: _cliente.codigoDistrito,
        disabled: true
      });
    }

    this.codigoPostalControl = new FormControl(_cliente.codigoPostal,
      [Validators.maxLength(12)]
    );

    this.direccionControl = new FormControl(
      _cliente.direccion,
      [
        Validators.maxLength(260),
        Validators.required
      ]
    );

    if (this.cliente.tipoPersona === TipoPersona.JURIDICA) {
      this.contactoNumeroDocControl = new FormControl(
        _cliente.contactoDocumento,
        [Validators.required, Validators.maxLength(14)]
      );

      this.contactoNombreControl = new FormControl(_cliente.nombreContacto, [
        Validators.required,
        Validators.maxLength(200)
      ]);

      this.contactoApelPaternoControl = new FormControl(
        _cliente.apellidoPaternoContacto,
        [Validators.required, Validators.maxLength(200)]
      );

      this.contactoApelMaternoControl = new FormControl(
        _cliente.apellidoMaternoContacto,
        [Validators.required, Validators.maxLength(200)]
      );

      this.sexoContactoControl = new FormControl(_cliente.sexoContacto);

      this.contactoTelefonoControl = new FormControl(_cliente.telefonoContacto, [Validators.maxLength(20)]);

      this.contactoCelularControl = new FormControl(_cliente.celularContacto, [Validators.maxLength(20)]);

      this.contactoCorreoControl = new FormControl(
        _cliente.correoContacto,
        [
          Validators.required,
          Validators.pattern('^(([^<>()\\[\\]\\.,;:\\s@\\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@(([^<>()\\.,;\\s@\\\"]+\\.{0,1})+[^<>()\\.,;:\\s@\\\"]{2,})$')
        ]
      );
    } else {
      this.contactoNumeroDocControl = new FormControl(
        _cliente.contactoDocumento
      );
      this.contactoNombreControl = new FormControl(_cliente.nombreContacto);
      this.contactoApelPaternoControl = new FormControl(
        _cliente.apellidoPaternoContacto
      );
      this.contactoApelMaternoControl = new FormControl(
        _cliente.apellidoMaternoContacto
      );
      this.sexoContactoControl = new FormControl(_cliente.sexoContacto);
      this.contactoTelefonoControl = new FormControl(_cliente.telefonoContacto);
      this.contactoCelularControl = new FormControl(_cliente.celularContacto);
      this.contactoCorreoControl = new FormControl(_cliente.correoContacto,
        [
          Validators.pattern('^(([^<>()\\[\\]\\.,;:\\s@\\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@(([^<>()\\.,;\\s@\\\"]+\\.{0,1})+[^<>()\\.,;:\\s@\\\"]{2,})$')
        ]);
    }
  }

  private createForm() {
    this.clienteForm = new FormGroup({
      numeroDocumento: this.numeroDocumentoControl,
      nombre: this.nombreControl,
      razonSocial: this.razonSocialControl,
      apellidoPaterno: this.apelPaternoControl,
      apellidoMaterno: this.apelMaternoControl,
      telefono: this.telefonoControl,
      celular: this.celularControl,
      correo: this.correoControl,
      estadoCivil: this.estadoCivilControl,
      codigoGenero: this.generoControl,
      fechaNacimiento: this.fechaNacimientoControl,
      idPais: this.paisControl,
      departamento: this.departamentoControl,
      provincia: this.provinciaControl,
      distrito: this.distritoControl,
      direccion: this.direccionControl,
      codigoPostal: this.codigoPostalControl,
      contacto: new FormGroup({
        nombre: this.contactoNombreControl,
        numeroDocumento: this.contactoNumeroDocControl,
        apellidoPaterno: this.contactoApelPaternoControl,
        apellidoMaterno: this.contactoApelMaternoControl,
        sexoContacto: this.sexoContactoControl,
        telefono: this.contactoTelefonoControl,
        celular: this.contactoCelularControl,
        correoContacto: this.contactoCorreoControl
      })
    });

    this.clienteForm.valueChanges.debounceTime(500).subscribe(data => {
      this.is_form_dirty = this.clienteForm.dirty ? true : false;
      this.is_validated = this.clienteForm.valid;
    });
    this.fechaNacimientoControl.valueChanges
      .debounceTime(500)
      .subscribe(data => {
        console.log(data);
      });
    this.paisControl.valueChanges
      .debounceTime(500)
      .map(paisCode => +paisCode)
      .subscribe(pais => {
        if (pais !== PaisConstante.PERU) {
          this.is_ubigeo_empty = true;
          this.departamentoControl.disable();
          this.departamentoControl.setValidators(Validators.nullValidator);
          this.provinciaControl.disable();
          this.provinciaControl.setValidators(Validators.nullValidator);
          this.distritoControl.disable();
          this.distritoControl.setValidators(Validators.nullValidator);
        } else {
          this.is_ubigeo_empty = false;
          this.departamentoControl.enable();
          this.departamentoControl.setValidators([
            Validators.required,
            this.nonDefaultValueValidator([this.selectDefaultValue])
          ]);
          this.provinciaControl.enable();
          this.provinciaControl.setValidators([
            Validators.required,
            this.nonDefaultValueValidator([this.selectDefaultValue])
          ]);
          this.distritoControl.enable();
          this.distritoControl.setValidators([
            Validators.required,
            this.nonDefaultValueValidator([this.selectDefaultValue])
          ]);
        }
        this.departamentoControl.updateValueAndValidity();
        this.provinciaControl.updateValueAndValidity();
        this.distritoControl.updateValueAndValidity();
      });
  }

  onPaisChange(pais?: any) {
    this.departamentos = null;
    this.provincias = null;
    this.distritos = null;
    pais = +pais;
    if (pais === PaisConstante.PERU) {
      this.departamentos = this.clienteService.obtenerDepartamentos();
      this.departamentoControl.setValue(this.selectDefaultValue);
      this.provinciaControl.setValue(this.selectDefaultValue);
      this.distritoControl.setValue(this.selectDefaultValue);
    }
  }

  onDepartamentoChange(departamento?: any) {
    departamento = this.departamentoControl.value;
    this.provinciaControl.setValue(this.selectDefaultValue);
    this.distritoControl.setValue(this.selectDefaultValue);
    this.provincias = null;
    if (departamento !== this.selectDefaultValue) {
      this.provincias = this.clienteService.obtenerProvincias(departamento);
    }
    this.distritos = null;
  }

  onProvinciaChange(provincia?: any) {
    const departamento = this.departamentoControl.value;
    provincia = this.provinciaControl.value;
    this.distritoControl.setValue(this.selectDefaultValue);
    this.distritos = null;
    if (provincia !== this.selectDefaultValue) {
      this.distritos = this.clienteService.obtenerDistritos(
        departamento,
        provincia
      );
    }
  }

  private fromDatetoNgbDateStructure(date: Date | NgbDateStruct,
                                     reverse?: boolean): Date | NgbDateStruct {
    if (!reverse && date instanceof Date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
    }
    date = date as NgbDateStruct;
    const objects = moment(`${date.month}-${date.day}-${date.year}`).toDate();
    return objects;
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  nonDefaultValueValidator(defaults: Array<any>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return defaults.includes(control.value)
        ? {nondefaultvalue: {value: control.value}}
        : null;
    };
  }
}
