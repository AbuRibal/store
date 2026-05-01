<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Electronics
            ['category_id' => 1, 'name' => 'سماعة لاسلكية Pro',   'slug' => 'wireless-headphones-pro', 'description' => 'سماعة بلوتوث عالية الجودة مع خاصية إلغاء الضوضاء',    'price' => 299,  'stock' => 45],
            ['category_id' => 1, 'name' => 'ساعة ذكية رياضية',   'slug' => 'smart-watch-sport',       'description' => 'ساعة ذكية تتابع نشاطك اليومي وصحتك',                   'price' => 680,  'stock' => 30],
            ['category_id' => 1, 'name' => 'باور بانك 20000mAh', 'slug' => 'power-bank-20000',        'description' => 'شاحن محمول بسعة كبيرة يشحن جهازين في وقت واحد',       'price' => 120,  'stock' => 80],
            ['category_id' => 1, 'name' => 'شاحن سريع 65W',      'slug' => 'fast-charger-65w',        'description' => 'شاحن سريع متوافق مع جميع الأجهزة الحديثة',            'price' => 85,   'stock' => 100],
            ['category_id' => 1, 'name' => 'كاميرا ويب HD',      'slug' => 'webcam-hd',               'description' => 'كاميرا واضحة للاجتماعات والبث المباشر',                'price' => 240,  'stock' => 25],
            ['category_id' => 1, 'name' => 'لاب توب الترا',      'slug' => 'ultra-laptop',            'description' => 'لاب توب رفيع وخفيف الوزن بأداء عالٍ',                  'price' => 4200, 'stock' => 15],
            // Bags
            ['category_id' => 2, 'name' => 'حقيبة ظهر عصرية',   'slug' => 'modern-backpack',         'description' => 'حقيبة ظهر أنيقة مناسبة للعمل والسفر',                  'price' => 450,  'stock' => 40],
            ['category_id' => 2, 'name' => 'حقيبة يد جلد',      'slug' => 'leather-handbag',         'description' => 'حقيبة يد نسائية من الجلد الطبيعي الفاخر',              'price' => 890,  'stock' => 20],
            // Home
            ['category_id' => 3, 'name' => 'مكبر صوت بلوتوث',   'slug' => 'bluetooth-speaker',       'description' => 'مكبر صوت محمول بجودة صوت استثنائية',                   'price' => 350,  'stock' => 35],
            ['category_id' => 3, 'name' => 'مصباح ذكي LED',      'slug' => 'smart-led-lamp',          'description' => 'مصباح ذكي يتحكم فيه تطبيق الهاتف بألوان متعددة',      'price' => 95,   'stock' => 60],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
