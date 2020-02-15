# xmas-data-bridge

Data bride for my [Interactive xmas tree](https://github.com/fancyn3rd?tab=projects#interactive-xmas-tree)

Its a node.js service that listens to the serial port.  
Then it publishes

* The device count
* When a device is added
* When a device is removed

to corresponding topics of a local mqtt broker.

**Install**

    npm install


**Usage**

    npm run start
