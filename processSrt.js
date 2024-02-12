const fs = require('node:fs');
const path = require('node:path');

const parseSrt = (srt) => {
    const srtArray = srt.split('\n\n');
    const srtObject = srtArray.map((item) => {
        const udp = item.copyWithin(0, 64); // TODO: see if we can use the udp information.
        const f_bit = item.copyWithin(64, 65); // f_bit is the packet type flag. '0' for data, '1' for control.
        if(f_bit === 0) {
            const srtObject = {
            packetType: f_bit,
            sequenceNumber: item.copyWithin(65, 97), // sequence number is 32 bits.
            pp: item.copyWithin(97, 101), // Packet Position Flag
            o: item.copyWithin(101, 102), // Order Flag
            kk: item.copyWithin(102, 103), // Key-based incription Flag
            r: item.copyWithin(103, 104), // Retransmitted packet Flag
            message: item.copyWithin(104, 130) //message number is 26 bits.
            payload: item.copyWithin(130, item.length) // the rest of the packet is the payload.
            aes-gcm-128: item.copyWithin(item.length-128, item.length) // TODO: find out if i care about this.
            }
        } else {
            const srtObject = {
            packetType: f_bit,
            controlType: item.copyWithin(65, 80), // control type is 15 bits.
            subType: item.copyWithin(80, 97), // sub type is 16 bits.
            timeSpecificInformation: item.copyWithin(97, 129), // time specific information is 32 bits. 
            timestamp: item.copyWithin(129, 161), // timestamp is 32 bits.
            : item.copyWithin(81, item.length)
            }
        }
    }
}
	


