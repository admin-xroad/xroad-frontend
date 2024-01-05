import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehicleStatusFormat',
  standalone: true,
})

export class vehicleStatusFormatPipe implements PipeTransform {
  transform(status: number): { name: string; color: string } {
    let statusName: string;
    let statusColor: string;

    switch (status) {
      case 0:
        statusName = 'Active';
        statusColor = 'primary';
        break;
      case 1:
        statusName = 'Inactive';
        statusColor = 'danger';
        break;
      default:
        statusName = 'Unknown';
        statusColor = 'light';
        break;
    }


    return { name: statusName, color: statusColor };
  }
}
