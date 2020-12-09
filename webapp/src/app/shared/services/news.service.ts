import { Injectable } from '@angular/core';
import { New } from '../models';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
  })
  export class NewService extends BaseService<New> {
    protected path = 'news';
  }