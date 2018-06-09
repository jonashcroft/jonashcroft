<?php get_header(); ?>

<main>
<?php if ( have_posts() ): while ( have_posts() ) : the_post(); ?>

    <header id="page-title">
        <h1><?php the_title(); ?></h1>

    <?php if ( is_single() ) { ?>
        <section id="meta">
            <span class="date"><?php the_time('jS F, Y'); ?></span>

            <aside class="tags">
            <?php the_tags( '<ul class="post-tags"><li>', '</li><li>', '</li></ul>' ); ?>
            </aside>
        </section>
    <?php } ?>
    </header>

<?php if ( has_post_thumbnail() ) { ?>
    <section id="featured-image">
        <?php the_post_thumbnail('post-header'); ?>
    </section>
<?php } ?>

    <article id="single">
    <?php the_content(); ?>
    </article>
<?php endwhile; endif; ?>

<?php if ( is_single() ) { ?>
    <section id="comments">
        <?php comments_template(); ?>
    </section>
<?php } ?>
</main>

<?php get_footer(); ?>