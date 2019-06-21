package fr.gest.com.application.repository;

import fr.gest.com.application.domain.MouvementStock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the MouvementStock entity.
 */
@Repository
public interface MouvementStockRepository extends JpaRepository<MouvementStock, Long> {

    @Query(value = "select distinct mouvementStock from MouvementStock mouvementStock left join fetch mouvementStock.articles",
        countQuery = "select count(distinct mouvementStock) from MouvementStock mouvementStock")
    Page<MouvementStock> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct mouvementStock from MouvementStock mouvementStock left join fetch mouvementStock.articles")
    List<MouvementStock> findAllWithEagerRelationships();

    @Query("select mouvementStock from MouvementStock mouvementStock left join fetch mouvementStock.articles where mouvementStock.id =:id")
    Optional<MouvementStock> findOneWithEagerRelationships(@Param("id") Long id);

}
