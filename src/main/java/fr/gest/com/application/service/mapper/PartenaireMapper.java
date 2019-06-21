package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.PartenaireDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Partenaire} and its DTO {@link PartenaireDTO}.
 */
@Mapper(componentModel = "spring", uses = {LangueMapper.class, AdresseMapper.class, ReferenceMapper.class, CategorieMapper.class, ArticleMapper.class, ReductionMapper.class, ProfileMapper.class, HabilitationMapper.class, FournisseurMapper.class})
public interface PartenaireMapper extends EntityMapper<PartenaireDTO, Partenaire> {

    @Mapping(source = "langue.id", target = "langueId")
    @Mapping(source = "adresse.id", target = "adresseId")
    @Mapping(source = "references.id", target = "referencesId")
    @Mapping(source = "categories.id", target = "categoriesId")
    @Mapping(source = "articles.id", target = "articlesId")
    @Mapping(source = "reductions.id", target = "reductionsId")
    @Mapping(source = "profiles.id", target = "profilesId")
    @Mapping(source = "habilitations.id", target = "habilitationsId")
    @Mapping(source = "fournisseurs.id", target = "fournisseursId")
    PartenaireDTO toDto(Partenaire partenaire);

    @Mapping(source = "langueId", target = "langue")
    @Mapping(source = "adresseId", target = "adresse")
    @Mapping(source = "referencesId", target = "references")
    @Mapping(source = "categoriesId", target = "categories")
    @Mapping(source = "articlesId", target = "articles")
    @Mapping(source = "reductionsId", target = "reductions")
    @Mapping(source = "profilesId", target = "profiles")
    @Mapping(source = "habilitationsId", target = "habilitations")
    @Mapping(source = "fournisseursId", target = "fournisseurs")
    @Mapping(target = "employes", ignore = true)
    @Mapping(target = "removeEmployes", ignore = true)
    Partenaire toEntity(PartenaireDTO partenaireDTO);

    default Partenaire fromId(Long id) {
        if (id == null) {
            return null;
        }
        Partenaire partenaire = new Partenaire();
        partenaire.setId(id);
        return partenaire;
    }
}
