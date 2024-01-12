import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TwoFactorValidationEmailDTO {
    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    from: string;

    @IsString()
    @IsNotEmpty()
    template: string;

    @IsString()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsOptional()
    title?: string;
}
