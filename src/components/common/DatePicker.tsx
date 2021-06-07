import React, { FC, useEffect, useState } from 'react'

interface IDatePicker{
    date:any;
    setDate: any;
    className?: string;

}

export const DatePicker: FC<IDatePicker> = (props) => {


    const transformInputToDate= (inputDate: string) => {
        let arr: string[] = inputDate.split('-');
        if(arr[1][0] === '0'){
            arr[1] = arr[1].slice(1);
        }
        if(arr[2][0] === '0'){
            arr[2] = arr[2].slice(1);
        }
        
        return new Date(parseInt(arr[0]),parseInt(arr[1])-1,parseInt(arr[2]))
    }
    const transformDateToInput= (date: Date) => {
        let month = date.getMonth().toString();
        let day = date.getDate().toString();
        if(day.length === 1){
            day = `0${day}`;
        }
        if(month.length === 1){
            month = `0${month}`;
        }
        
        return `${date.getFullYear()}-${month}-${day}`
    }


    return (
        <input type='date' className={props.className} value={transformDateToInput(props.date)} onChange={e=> {
            const date = transformInputToDate(e.target.value);
            props.setDate(date);
        }} />
        
    )
}
