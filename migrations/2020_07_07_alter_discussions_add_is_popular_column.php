<?php

use Flarum\Database\Migration;

return Migration::addColumns('discussions', [
    'is_popular' => ['boolean', 'default' => false],
]);
