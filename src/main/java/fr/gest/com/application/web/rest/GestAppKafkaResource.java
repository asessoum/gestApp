package fr.gest.com.application.web.rest;

import fr.gest.com.application.service.GestAppKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/gest-app-kafka")
public class GestAppKafkaResource {

    private final Logger log = LoggerFactory.getLogger(GestAppKafkaResource.class);

    private GestAppKafkaProducer kafkaProducer;

    public GestAppKafkaResource(GestAppKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.sendMessage(message);
    }
}
