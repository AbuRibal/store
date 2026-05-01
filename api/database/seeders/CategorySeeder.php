<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create(['name' => 'إلكترونيات',    'slug' => 'electronics',  'description' => 'أجهزة إلكترونية وإكسسوارات']);
        Category::create(['name' => 'حقائب وأزياء',  'slug' => 'fashion',      'description' => 'حقائب وملابس عصرية']);
        Category::create(['name' => 'المنزل والديكور','slug' => 'home-garden',  'description' => 'أثاث وديكور وإضاءة']);
    }
}
