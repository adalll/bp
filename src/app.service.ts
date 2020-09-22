import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit{

  onModuleInit(): any {

    //console.log(!!"0");

    // const date = new Date();
    // const date2 = new Date();
    // console.log(date);
    //
    // let dates: Date[] = [];
    // dates.push(new Date(date.setHours(date.getHours()-1)));
    // dates.push(new Date(date.setHours(date.getHours()-2)));
    // dates.push(new Date(date.setHours(date.getHours()-2)));
    // dates.push(new Date(date.setHours(date.getHours()+27)));
    // dates.push(new Date(date.setHours(date.getHours()-17)));
    // dates.push(new Date(date.setHours(date.getHours()+20)));
    // dates.push(new Date(date.setHours(date.getHours()-122)));
    //
    // console.log(dates);
    //
    //
    // const findDate = new Date(date2.setHours(date2.getHours()-4));
    // console.log(findDate);
    //
    // dates = dates.sort((a,b) => +a - +b).filter(date => date < findDate);
    // console.log(dates);
    //
    // const closest = dates[dates.length-1];
    //
    // // const closest = dates.reduce((p,c) =>
    // //   Math.abs(+p - +findDate) < Math.abs(+c - +findDate)
    // //     ? p
    // //     : c
    // // );
    //
    // console.log(closest);
    //
    // //console.log(dates);
    //
    //
    //
    //
    // //console.log(new Date(date.setMonth(date.getMonth()-24)));

  }


  getHello(): string {
    return 'Hello World!';
  }
}
