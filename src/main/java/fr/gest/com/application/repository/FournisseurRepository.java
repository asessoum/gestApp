package fr.gest.com.application.repository;

import fr.gest.com.application.domain.Fournisseur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Fournisseur entity.
 */
@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {

    @Query(value = "select distinct fournisseur from Fournisseur fournisseur left join fetch fournisseur.langues",
        countQuery = "select count(distinct fournisseur) from Fournisseur fournisseur")
    Page<Fournisseur> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct fournisseur from Fournisseur fournisseur left join fetch fournisseur.langues")
    List<Fournisseur> findAllWithEagerRelationships();

    @Query("select fournisseur from Fournisseur fournisseur left join fetch fournisseur.langues where fournisseur.id =:id")
    Optional<Fournisseur> findOneWithEagerRelationships(@Param("id") Long id);

}
