package com.url.shortener.service;

import com.url.shortener.dto.ClickEventDTO;
import com.url.shortener.dto.UrlMappingDTO;
import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import com.url.shortener.repository.ClickEventRepository;
import org.antlr.v4.runtime.misc.LogManager;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.url.shortener.repository.UrlMappingRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class UrlMappingService {

    @Autowired
    private UrlMappingRepository urlMappingRepository;

    @Autowired
    private ClickEventRepository clickEventRepository;

    @Autowired
    private ModelMapper modelMapper;

    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl();
        UrlMapping urlMapping = new UrlMapping(originalUrl,shortUrl,0, LocalDateTime.now(),user );

        // Save urlMapping to the database
        urlMappingRepository.save(urlMapping);

        return modelMapper.map(urlMapping, UrlMappingDTO.class);
    }

    private String generateShortUrl() {
        String characterList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(characterList.length());
            sb.append(characterList.charAt(index));
        }
        return sb.toString();
    }

    public List<UrlMappingDTO> getUrlsByUser(User user) {
        List<UrlMapping> urls = urlMappingRepository.findByUser(user);
        return urls.stream()
                .map(url -> modelMapper.map(url, UrlMappingDTO.class))
                .toList();
    }

    public List<ClickEventDTO> getUrlAnalytics(String shortUrl, String startDate, String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        // First check if the URL exists
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);

//        if (urlMapping != null) {
//            // Filter click events based on the date range
//            List<UrlMapping> filteredClickEvents = urlMapping.getClickEvents().stream()
//                    .filter(clickEvent -> {
//                        LocalDate clickDate = clickEvent.getClickDate().toLocalDate();
//                        return (clickDate.isEqual(start) || clickDate.isAfter(start)) &&
//                                (clickDate.isEqual(end) || clickDate.isBefore(end));
//                    })
//                    .toList();
//
//            return filteredClickEvents.stream()
//                    .map(clickEvent -> modelMapper.map(clickEvent, UrlMappingDTO.class))
//                    .toList();
//        }
        return List.of();
    }

    public UrlMapping getOriginalUrl(String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);

            // Record click event
            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);

            clickEventRepository.save(clickEvent);
            return urlMapping;
        }
        return null;
    }
}
