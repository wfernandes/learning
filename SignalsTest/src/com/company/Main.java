package com.company;

import sun.misc.Signal;
import sun.misc.SignalHandler;

public class Main {

    public static void main(String[] args) {

        Signal signal1 = new Signal("HUP");
        Signal signal2 = new Signal("INT");

        SignalHandler signalHandler1 = new SignalHandler() {
            @Override
            public void handle(Signal signal) {

                System.out.format("Signal received %s\n", signal.toString());
            }
        };

        SignalHandler signalHandler2 = new SignalHandler() {
            @Override
            public void handle(Signal signal) {

                System.out.format(" Another Signal received %s\n", signal.toString());
            }
        };

        Signal.handle(signal1, signalHandler1);
        Signal.handle(signal2, signalHandler2);

        try {
            Thread.sleep(60000);
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }
}
