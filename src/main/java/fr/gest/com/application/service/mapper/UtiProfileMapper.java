package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.UtiProfileDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link UtiProfile} and its DTO {@link UtiProfileDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeMapper.class, ProfileMapper.class})
public interface UtiProfileMapper extends EntityMapper<UtiProfileDTO, UtiProfile> {

    @Mapping(source = "employe.id", target = "employeId")
    @Mapping(source = "profile.id", target = "profileId")
    UtiProfileDTO toDto(UtiProfile utiProfile);

    @Mapping(source = "employeId", target = "employe")
    @Mapping(source = "profileId", target = "profile")
    UtiProfile toEntity(UtiProfileDTO utiProfileDTO);

    default UtiProfile fromId(Long id) {
        if (id == null) {
            return null;
        }
        UtiProfile utiProfile = new UtiProfile();
        utiProfile.setId(id);
        return utiProfile;
    }
}
