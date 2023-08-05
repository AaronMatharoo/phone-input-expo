import React, { useState } from 'react'
import iso3311a2 from 'iso-3166-1-alpha-2'
import { countries } from 'country-flag-icons'
import { getCountryCallingCode, parsePhoneNumber } from 'libphonenumber-js'
import { Box, HStack, Input, Select, Text, VStack } from 'native-base'

const PhoneInput = () => {
  const [prefix, setPrefix] = useState('')
  const [phone, setPhone] = useState('')
  const [shortCountry, setShortCountry] = useState('')
  const countriesList = countries

  function fullCountryNames(country) {
    if (iso3311a2.getCountry(country) !== undefined) {
      return iso3311a2.getCountry(country)
    } else {
      return country
    }
  }

  function formatPhone(value, shortCountry) {
    try {
      const enteredPhone = parsePhoneNumber(value, shortCountry)
      const formatted = enteredPhone.formatNational()
      return formatted
    } catch (error) {
      return value
    }
  }

  return (
    <>
      <VStack space={2}>
        <Box>
          <HStack alignItems={'center'}>
            <Select
            w={200}
            fontSize={15}
              onValueChange={(value) => {
                const code = getCountryCallingCode(value)
                setPrefix(code)
                setShortCountry(value)
                console.log(value)
              }}
            >
              {countriesList.map((country, i) => (
                <Select.Item
                  key={i}
                  label={`${fullCountryNames(country)}`}
                  value={country}
                />
              ))}
            </Select>
          </HStack>
        </Box>
        <Box>
          <Text fontSize={16} fontWeight={'semibold'}pb={1}>Enter your phone number</Text>
          <HStack alignItems={'center'} space={3}>
            <Box borderWidth={1} rounded={'sm'} borderColor={'gray.300'}>
              <Text px={2} py={1} 
              fontSize={16}
              >{`+ ${prefix}`}</Text>
            </Box>
            <Input
              width={250}
              fontSize={16}
              returnKeyType={'done'}
              onChangeText={(value) => {
                const formattedPhone = formatPhone(value, shortCountry)
                setPhone(formattedPhone)
              }}
              keyboardType={'numeric'}
              value={phone}
            />
          </HStack>
        </Box>
      </VStack>
    </>
  )
}

export default PhoneInput
