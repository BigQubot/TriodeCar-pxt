enum PingUnit {
    //% block="cm"
    Centimeters,
}


//% weight=0 color=#FF7256 icon="\uf1b9" block="TriodeCar"
namespace triodecar {

    export enum Patrol {
        //% blockId="patrolLeft" block="left"
        PatrolLeft = 2,
        //% blockId="patrolRight" block="right"
        PatrolRight = 1
    }


    export enum direction {
        //% blockId="foward" block="foward"
        foward = 1,
        //% blockId="stop" block="stop"
        stop = 2,
        //% blockId="turnleft" block="left"
        left = 3,
        //% blockId="turnright" block="right"
        right = 4,
    }


    /**
     * Read ultrasonic sensor.
     */

    //% blockId=ultrasonic_sensor block="read ultrasonic sensor |%unit "
    //% weight=95
    export function Ultrasonic(unit: PingUnit, maxCmDistance = 500): number {
        let d
        pins.digitalWritePin(DigitalPin.P12, 1);
        basic.pause(1)
        pins.digitalWritePin(DigitalPin.P12, 0);
        if (pins.digitalReadPin(DigitalPin.P13) == 0) {
            pins.digitalWritePin(DigitalPin.P12, 0);
            //sleep_us(2);
            pins.digitalWritePin(DigitalPin.P12, 1);
            //sleep_us(10);
            pins.digitalWritePin(DigitalPin.P12, 0);
            d = pins.pulseIn(DigitalPin.P13, PulseValue.High, maxCmDistance * 58);//readPulseIn(1);
        } else {
            pins.digitalWritePin(DigitalPin.P12, 0);
            pins.digitalWritePin(DigitalPin.P12, 1);
            d = pins.pulseIn(DigitalPin.P13, PulseValue.Low, maxCmDistance * 58);//readPulseIn(0);
        }
        let x = d / 39;
        if (x <= 0 || x > 500) {
            return 0;
        }
        switch (unit) {
            case PingUnit.Centimeters: return Math.round(x);
            default: return Math.idiv(d, 2.54);
        }

    }


     /**
     * Read line tracking sensor.
     */

    //% weight=20
    //% blockId=read_Patrol block="read |%patrol line tracking sensor"
    //% patrol.fieldEditor="gridpicker" patrol.fieldOptions.columns=2 
    export function readPatrol(patrol: Patrol): number {
        if (patrol == Patrol.PatrolLeft) {
            return pins.analogReadPin(AnalogPin.P2)
        } else if (patrol == Patrol.PatrolRight) {
            return pins.analogReadPin(AnalogPin.P1)
        } else {
            return -1
        }
    }


   /**
    * CarDirection.
    */

   //% blockId=IR_Enable block="move direction |%direction"
   //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=4 
   //% weight=93 blockGap=8

    export function CarDirection(Direction: direction): void {
        if (Direction == direction.foward) {
            pins.digitalWritePin(DigitalPin.P14, 0)    //left
            pins.digitalWritePin(DigitalPin.P15, 0)    //right
        } 
        else if (Direction == direction.stop) {
            pins.digitalWritePin(DigitalPin.P14, 1)    //left
            pins.digitalWritePin(DigitalPin.P15, 1)    //right
       } 
        else if (Direction == direction.left) {
            pins.digitalWritePin(DigitalPin.P14, 1)    //left
            pins.digitalWritePin(DigitalPin.P15, 0)    //right
       }  
       else if (Direction == direction.right) {
            pins.digitalWritePin(DigitalPin.P14, 0)    //left
            pins.digitalWritePin(DigitalPin.P15, 1)    //right
       } 
   }

}
