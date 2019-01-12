//
//  Shader.fsh
//  Flea
//
//  Created by Michael Jacobs on 11/18/09.
//  Copyright __MyCompanyName__ 2009. All rights reserved.
//

varying lowp vec4 colorVarying;

void main()
{
	gl_FragColor = colorVarying;
}
