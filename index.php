<?php get_header(); ?>

<main>
<?php
    global $post; // required
    $args = [
            // 'post_type'    => 'post',
            // 'numberposts'  => -1
            ];
    $allPosts = get_posts($args);

    foreach($allPosts as $post) { setup_postdata($post); ?>
        <article class="post-item">
            <h2><a href="<?php echo get_permalink($post->ID); ?>" title="Read '<?php echo $post->post_title; ?>'"><?php echo $post->post_title; ?></a></h2>
            <span class="date"><?php echo date('jS M Y', strtotime($post->post_date) ); ?></span>
            <p><?php echo wp_trim_words($post->post_content, '50'); ?></p>
        </article>

    <?php } ?>
</main>

<?php get_footer(); ?>