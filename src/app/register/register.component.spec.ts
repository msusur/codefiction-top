import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { SocketService } from '../socket.service';
import { RegisterComponent } from './register.component';
import { TopMainComponent } from '../top-main/top-main.component';
import { routing } from '../app.route';

import * as io from 'socket.io-client';

describe('Register Component', (): void => {
  let fixture: ComponentFixture<RegisterComponent>;
  let registerComponent: RegisterComponent;
  let socketServiceMock: any;

  beforeEach(async((): void => {
    socketServiceMock = {
      getCurrentTopper: jasmine.createSpy('getCurrentTopper').and.returnValue('foo'),
      emit: jasmine.createSpy('emit'),
      on: jasmine.createSpy('on')
    };

    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        TopMainComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        FormsModule,
        routing
      ],
      providers: [
        {
          provide: SocketService, useValue: socketServiceMock
        },
        { provide: APP_BASE_HREF, useValue: '/topper' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    registerComponent = fixture.componentInstance;
  }));

  describe('constructor', (): void => {
    it('should call getCurrentTopper', (): void => {
      // Act
      expect(socketServiceMock.getCurrentTopper).toHaveBeenCalled();
    });
  });

  it('should add users', (): void => {
    // Act
    registerComponent.addUser();

    // Assert
    expect(socketServiceMock.emit).toHaveBeenCalledWith('addUser', 'foo');
  });

  describe('ngOnInit', (): void => {
    let registerUpdateToppersSpy: jasmine.Spy;
    let registerUpdateMeSpy: jasmine.Spy;
    let registerRegisterFailedSpy: jasmine.Spy;

    beforeEach((): void => {
      registerUpdateToppersSpy = spyOn(registerComponent, 'registerUpdateToppers');
      registerUpdateMeSpy = spyOn(registerComponent, 'registerUpdateMe');
      registerRegisterFailedSpy = spyOn(registerComponent, 'registerRegisterFailed');
    });

    it('should call registerUpdateToppers', (): void => {
      // Act
      registerComponent.ngOnInit();

      // Assert
      expect(registerUpdateToppersSpy).toHaveBeenCalled();
    });

    it('should call registerUpdateMe', (): void => {
      // Act
      registerComponent.ngOnInit();

      // Assert
      expect(registerUpdateMeSpy).toHaveBeenCalled();
    });

    it('should call registerRegisterFailed', (): void => {
      // Act
      registerComponent.ngOnInit();

      // Assert
      expect(registerRegisterFailedSpy).toHaveBeenCalled();
    });

    // describe('registerRegisterFailed', (): void => {
    //   it('should create register_failed on socketService', (): void => {
    //     // TODO: registerRegisterFailed 
    //     expect(false).toBeTruthy();
    //   });
    // });

    // describe('registerUpdateMe', (): void => {
    //   it('should create update_me on socketService', (): void => {
    //     // TODO: registerRegisterFailed 
    //     expect(false).toBeTruthy();
    //   });
    // });

    // describe('registerUpdateToppers', (): void => {
    //   it('should create update_toppers on socketService', (): void => {
    //     // TODO: registerRegisterFailed 
    //     expect(false).toBeTruthy();
    //   });
    // });
  });
});