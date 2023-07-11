#!/bin/bash

# Prompt the user for the Docker container name
read -p "Enter the CONTAINER ID of your Docker container: " container_name

# Prompt the user for the PostgreSQL username
read -p "Enter the PostgreSQL username: " username

# Prompt the user for the number of dummy rows
read -p "Enter the number of dummy rows to load: " num_rows

# Generate random names for landlords
landlords=("John Doe" "Jane Smith" "David Johnson" "Emily Brown" "Michael Davis" "Sarah Wilson" "James Anderson" "Linda Thompson" "Robert Martinez" "Karen Adams" "Daniel White" "Jessica Scott" "William Taylor" "Amanda Clark" "Christopher Lewis")
num_landlords=${#landlords[@]}

# Generate random cities and corresponding states
cities=("New York" "Los Angeles" "London" "Sydney" "Toronto")
states_ca=("Ontario" "Quebec" "British Columbia" "Alberta" "Manitoba")
states_us=("California" "New York" "Texas" "Florida" "Illinois")
states_gb=("England" "Scotland" "Wales" "Northern Ireland")
states_au=("New South Wales" "Queensland" "Victoria" "Western Australia" "South Australia")
states_nz=("Auckland" "Wellington" "Canterbury" "Waikato" "Otago")
num_cities=${#cities[@]}

# Generate random zip or postal codes corresponding to country codes
zip_codes_ca=("M5S 2C4" "H3Z 1X2" "V6B 1L8" "T2P 1J9" "R3C 1B6")
zip_codes_us=("90210" "10001" "77002" "33109" "60601")
zip_codes_gb=("EC1A 1BB" "EH1 1YZ" "SW1A 0AA" "CF10 1BH" "BT1 1AA")
zip_codes_au=("2000" "4000" "3000" "6000" "5000")
zip_codes_nz=("1010" "6011" "8011" "3200" "9016")

# Generate a random number between 1 and 5
generate_random_rating() {
  awk -v min=1 -v max=5 'BEGIN{srand(); print int(min+rand()*(max-min+1))}'
}

generate_random_review() {
  lorem_ipsum="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis gravida condimentum. Integer rhoncus quam eget lacus fermentum fringilla. Vestibulum nec ligula lobortis, interdum eros et, pulvinar justo. Sed sollicitudin facilisis commodo. Proin finibus, metus a tristique gravida, ex neque sollicitudin ipsum, sit amet viverra tortor arcu nec est. Curabitur quis efficitur nisl, a accumsan odio. Sed in consequat lacus. Sed ac semper libero. Nulla dictum lectus nibh, nec lobortis est vehicula vel. Vestibulum tempus sollicitudin neque, vitae volutpat lacus porttitor et. Cras faucibus viverra mi, vitae ullamcorper nulla pharetra sed. Sed et mauris ultrices, efficitur mauris in, finibus justo. Fusce iaculis id diam et gravida."

  min_length=10
  max_length=200

  length=$(shuf -i "$min_length"-"$max_length" -n 1)
  echo "${lorem_ipsum:0:length}"
}

# Generate random values and insert into the table
echo "Generating dummy data..."

for ((i=1; i<=num_rows; i++)); do
  # Generate random values
  landlord=${landlords[$((RANDOM % num_landlords))]}
  country_index=$((RANDOM % 5))
  country_code=("CA" "US" "GB" "AU" "NZ")
  country=${country_code[$country_index]}
  city=${cities[$((RANDOM % num_cities))]}

  case $country in
    "ca")
      state=${states_ca[$((RANDOM % 5))]}
      zip=${zip_codes_ca[$((RANDOM % 5))]}
      ;;
    "us")
      state=${states_us[$((RANDOM % 5))]}
      zip=${zip_codes_us[$((RANDOM % 5))]}
      ;;
    "gb")
      state=${states_gb[$((RANDOM % 4))]}
      zip=${zip_codes_gb[$((RANDOM % 5))]}
      ;;
    "au")
      state=${states_au[$((RANDOM % 5))]}
      zip=${zip_codes_au[$((RANDOM % 5))]}
      ;;
    "nz")
      state=${states_nz[$((RANDOM % 5))]}
      zip=${zip_codes_nz[$((RANDOM % 5))]}
      ;;
  esac

  repair=$(generate_random_rating)
  health=$(generate_random_rating)
  stability=$(generate_random_rating)
  privacy=$(generate_random_rating)
  respect=$(generate_random_rating)
  review=$(generate_random_review)

  # Insert the data into the table
  docker exec -it "$container_name" psql -U "$username" -c "INSERT INTO review (landlord, country_code, city, state, zip, review, repair, health, stability, privacy, respect, flagged, flagged_reason, admin_approved, admin_edited) VALUES ('$landlord', '$country', '$city', '$state', '$zip', '$review', $repair, $health, $stability, $privacy, $respect, false, NULL, false, false);"
done

echo "Data loaded successfully!"