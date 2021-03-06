import { Component, OnInit } from '@angular/core';
import {ExecuteResponse, ResultResponse, StatusResponse, WpsNgService} from 'wps-ng';
import {CapabilitiesResponse} from 'wps-ng';
import {ProcessDescriptionResponse} from 'wps-ng';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wps-example',
  templateUrl: './wps-example.component.html',
  styleUrls: ['./wps-example.component.css']
})

export class WpsExampleComponent implements OnInit {
  title: CapabilitiesResponse;
  selectedURL = 'https://testbed.dev.52north.org/javaps/service';
  selectedVersion = '2.0.0';
  urls: string[];
  versions: string[];
  capabilitiesResponse: CapabilitiesResponse;
  selectedProcessIdentifier: string;
  wpsService: WpsNgService;
  rightScreenTitle: string;
  rightScreenJsonContent: string;

  constructor(private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.wpsService = new WpsNgService(this.selectedVersion, this.selectedURL);
    this.urls = [
      'https://testbed.dev.52north.org/javaps/service',
      'http://geoprocessing.demo.52north.org:8080/javaps/service',
      'http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService',
      'https://ows.terrestris.de/deegree-wps/services',
      'http://zoo-project.org/cgi-bin/zoo_loader.cgi',
      'https://maps.dwd.de/geoserver/ows',
      'https://riesgos.52north.org/wps/WebProcessingService'
    ];
    this.versions = ['1.0.0', '2.0.0'];
    this.rightScreenTitle = 'Output appears here';
    if (window.location.href.includes('github.io')) {
    this.toastr.warning('On Github Pages, some functionalities with non secure WPS Servers may not function properly',
      'Github Pages', { timeOut: 9500 });
    }
  }


  updateRightScreenContents(title: string, jsonContent: any) {
    this.rightScreenTitle = title;
    this.rightScreenJsonContent = jsonContent;
  }

  receiveCapabilitiesResponse($event: CapabilitiesResponse) {
    this.updateRightScreenContents('Capabilities Response:', $event);
  }

  receiveProcessDescriptionResponse($event: ProcessDescriptionResponse) {
    this.updateRightScreenContents('Process Description Response:', $event);
  }

  receiveExecuteProcessResponse($event: ExecuteResponse){
    this.updateRightScreenContents('Execute Process', $event);
  }

  receiveStatusResponse($event: StatusResponse){
    this.updateRightScreenContents('Get Process Status', $event);
  }

  receiveResultResponse($event: ResultResponse){
    this.updateRightScreenContents('Get Process Result', $event);
  }

  executeRequestXml($event: string) {
    console.log($event);
  }
}
