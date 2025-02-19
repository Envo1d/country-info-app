import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import {
  Country,
  DetailedCountry,
  DetailedResponse,
} from '../types/country.response';
import FlagsResponse from '../types/flags.response';
import { PopulationResponse } from '../types/population.response';

@Injectable()
export class CountriesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async findAll() {
    const { data } = await firstValueFrom(
      this.httpService.get<AxiosResponse<Country[]>>(
        `${this.configService.get<string>('dateNagerBaseUrl')}/AvailableCountries`,
      ),
    );
    return data;
  }

  async getBorders(code: string): Promise<DetailedResponse> {
    const { data: bordersRes } =
      await this.httpService.axiosRef.get<DetailedCountry>(
        `${this.configService.get<string>('dateNagerBaseUrl')}/CountryInfo/${code}`,
      );

    const { data: populationRes } =
      await this.httpService.axiosRef.get<PopulationResponse>(
        `${this.configService.get<string>('countriesNowBaseUrl')}/population`,
      );

    const { data: flagRes } =
      await this.httpService.axiosRef.get<FlagsResponse>(
        `${this.configService.get<string>('countriesNowBaseUrl')}/flag/images`,
      );

    const flagData = flagRes.data.filter(
      (country) => country.iso2 === code.toUpperCase(),
    )[0];

    const populationData = populationRes.data.filter(
      (country) => country.code === flagData.iso3,
    )[0].populationCounts;

    return {
      countryName: bordersRes.commonName,
      officialName: bordersRes.officialName,
      borders: bordersRes.borders,
      populationData,
      flagUrl: flagData.flag,
    };
  }
}
