package com.url.shortener.service;

import com.url.shortener.dto.UrlMappingDTO;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import org.antlr.v4.runtime.misc.LogManager;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.url.shortener.repository.UrlMappingRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class UrlMappingService {

    @Autowired
    private UrlMappingRepository urlMappingRepository;

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
}
