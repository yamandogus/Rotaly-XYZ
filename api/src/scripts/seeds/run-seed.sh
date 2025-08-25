#!/usr/bin/env bash

show_usage() {
    echo "KULLANIM: $0 [SEÇENEKLER]"
    echo ""
    echo "Seçenekler:"
    echo "  -u, --users     Kullanıcı ekle (1 admin, 2 owners, 3 customers (1 tanesi test için unverified), 2 support, 1 AI)"
    echo "  -h, --hotels    Otel örnekleri ekle"
    echo "  -a, --all       Varolan tüm seed scriptlerini çalıştır"
    echo "  --help          Bu yardım mesajını göster"
    echo ""
    echo "Örnekler:"
    echo "  $0 --users      # Sadece kullanıcıları ekle"
    echo "  $0 --hotels     # Sadece otel örneklerini ekle"
    echo "  $0 --all        # Varolan tüm seed scriptlerini çalıştır"
    echo ""
}

seed_users() {
    echo "Veritabanına kullanıcı ekleme işlemi başladı..."
    npx ts-node src/scripts/seeds/seed-users.ts
    if [ $? -eq 0 ]; then
        echo "Kullanıcı ekleme işlemi başarıyla tamamlandı!"
    else
        echo "Kullanıcı ekleme işlemi başarısız oldu!"
        exit 1
    fi
}

seed_hotels() {
    echo "Veritabanına otel ekleme işlemi başladı..."
    npx ts-node src/scripts/seeds/seed-hotels.ts
    if [ $? -eq 0 ]; then
        echo "Otel ekleme işlemi başarıyla tamamlandı!"
    else
        echo "Otel ekleme işlemi başarısız oldu!"
        exit 1
    fi
}

seed_all() {
    echo "Varolan tüm seed scriptleri çalıştırılıyor..."
    echo ""
    seed_users
    echo ""
    seed_hotels
    echo ""
    echo "Tüm ekleme işlemleri başarıyla tamamlandı!"
}

cd /home/cagla/projects/Rotaly-XYZ/api

# check if no arguments provided
if [ $# -eq 0 ]; then
    echo "ERR: Hiçbir argüman sağlanmadı."
    echo ""
    show_usage
    exit 1
fi

# parse command line arguments
case "$1" in
    -u|--users)
        seed_users
        ;;
    -h|--hotels)
        seed_hotels
        ;;
    -a|--all)
        seed_all
        ;;
    --help)
        show_usage
        exit 0
        ;;
    *)
        echo "ERR: Geçersiz seçenek '$1'"
        echo ""
        show_usage
        exit 1
        ;;
esac
